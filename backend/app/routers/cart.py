from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.dependencies import get_current_user, get_db
from app.models.cart import CartItem
from app.models.product import Product
from app.models.user import User
from app.schemas.cart import CartItemAdd, CartItemUpdate, CartResponse

router = APIRouter()


def _build_cart_response(db: Session, user_id: int) -> dict:
    items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product).joinedload(Product.category))
        .filter(CartItem.user_id == user_id)
        .all()
    )
    total = sum(item.product.price * item.quantity for item in items)

    cart_items = []
    for item in items:
        cart_items.append({
            "id": item.id,
            "product_id": item.product_id,
            "quantity": item.quantity,
            "product": {
                "id": item.product.id,
                "name": item.product.name,
                "slug": item.product.slug,
                "description": item.product.description,
                "price": item.product.price,
                "image_url": item.product.image_url,
                "stock": item.product.stock,
                "is_active": item.product.is_active,
                "category_id": item.product.category_id,
                "category_name": item.product.category.name if item.product.category else "",
                "created_at": item.product.created_at,
            },
        })

    return {"items": cart_items, "total": total}


@router.get("/", response_model=CartResponse)
def get_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return _build_cart_response(db, current_user.id)


@router.post("/items", response_model=CartResponse)
def add_to_cart(
    data: CartItemAdd,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == data.product_id, Product.is_active == True).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produit non trouvé")
    if product.stock < data.quantity:
        raise HTTPException(status_code=400, detail="Stock insuffisant")

    existing = (
        db.query(CartItem)
        .filter(CartItem.user_id == current_user.id, CartItem.product_id == data.product_id)
        .first()
    )
    if existing:
        existing.quantity += data.quantity
    else:
        item = CartItem(user_id=current_user.id, product_id=data.product_id, quantity=data.quantity)
        db.add(item)

    db.commit()
    return _build_cart_response(db, current_user.id)


@router.patch("/items/{item_id}", response_model=CartResponse)
def update_cart_item(
    item_id: int,
    data: CartItemUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Article non trouvé")

    if data.quantity < 1:
        db.delete(item)
    else:
        item.quantity = data.quantity

    db.commit()
    return _build_cart_response(db, current_user.id)


@router.delete("/items/{item_id}", response_model=CartResponse)
def remove_cart_item(
    item_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.user_id == current_user.id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Article non trouvé")
    db.delete(item)
    db.commit()
    return _build_cart_response(db, current_user.id)


@router.delete("/", response_model=CartResponse)
def clear_cart(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    return {"items": [], "total": 0}
