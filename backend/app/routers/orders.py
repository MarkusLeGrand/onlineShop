from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.dependencies import get_current_user, get_db
from app.models.cart import CartItem
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.order import OrderCreate, OrderResponse

router = APIRouter()


def _order_to_response(order: Order) -> dict:
    return {
        "id": order.id,
        "total": order.total,
        "status": order.status,
        "shipping_address": order.shipping_address,
        "created_at": order.created_at,
        "items": [
            {
                "id": oi.id,
                "product_id": oi.product_id,
                "quantity": oi.quantity,
                "price_at_time": oi.price_at_time,
                "product": {
                    "id": oi.product.id,
                    "name": oi.product.name,
                    "slug": oi.product.slug,
                    "description": oi.product.description,
                    "price": oi.product.price,
                    "image_url": oi.product.image_url,
                    "stock": oi.product.stock,
                    "is_active": oi.product.is_active,
                    "category_id": oi.product.category_id,
                    "category_name": oi.product.category.name if oi.product.category else "",
                    "created_at": oi.product.created_at,
                },
            }
            for oi in order.items
        ],
    }


@router.post("/", response_model=OrderResponse, status_code=201)
def create_order(
    data: OrderCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    cart_items = (
        db.query(CartItem)
        .options(joinedload(CartItem.product))
        .filter(CartItem.user_id == current_user.id)
        .all()
    )
    if not cart_items:
        raise HTTPException(status_code=400, detail="Le panier est vide")

    total = 0.0
    order_items = []
    for ci in cart_items:
        if ci.product.stock < ci.quantity:
            raise HTTPException(status_code=400, detail=f"Stock insuffisant pour {ci.product.name}")
        ci.product.stock -= ci.quantity
        line_total = ci.product.price * ci.quantity
        total += line_total
        order_items.append(
            OrderItem(
                product_id=ci.product_id,
                quantity=ci.quantity,
                price_at_time=ci.product.price,
            )
        )

    order = Order(
        user_id=current_user.id,
        total=total,
        shipping_address=data.shipping_address,
        items=order_items,
    )
    db.add(order)
    db.query(CartItem).filter(CartItem.user_id == current_user.id).delete()
    db.commit()
    db.refresh(order)

    # Reload with relationships
    order = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category))
        .filter(Order.id == order.id)
        .first()
    )
    return _order_to_response(order)


@router.get("/", response_model=list[OrderResponse])
def list_orders(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    orders = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category))
        .filter(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
        .all()
    )
    return [_order_to_response(o) for o in orders]


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category))
        .filter(Order.id == order_id, Order.user_id == current_user.id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    return _order_to_response(order)
