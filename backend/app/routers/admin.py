import re

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from app.dependencies import get_admin_user, get_db
from app.models.category import Category
from app.models.order import Order, OrderItem
from app.models.product import Product
from app.models.user import User
from app.schemas.category import CategoryCreate, CategoryResponse, CategoryUpdate
from app.schemas.order import OrderResponse, OrderStatusUpdate
from app.schemas.product import ProductCreate, ProductResponse, ProductUpdate

router = APIRouter()


def _slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return re.sub(r"-+", "-", text).strip("-")


def _product_to_response(product: Product) -> dict:
    return {
        "id": product.id,
        "name": product.name,
        "slug": product.slug,
        "description": product.description,
        "price": product.price,
        "image_url": product.image_url,
        "stock": product.stock,
        "is_active": product.is_active,
        "category_id": product.category_id,
        "category_name": product.category.name if product.category else "",
        "created_at": product.created_at,
    }


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


# --- Stats ---
@router.get("/stats")
def get_stats(
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    total_orders = db.query(func.count(Order.id)).scalar()
    total_revenue = db.query(func.coalesce(func.sum(Order.total), 0)).scalar()
    total_users = db.query(func.count(User.id)).scalar()
    total_products = db.query(func.count(Product.id)).scalar()
    return {
        "total_orders": total_orders,
        "total_revenue": total_revenue,
        "total_users": total_users,
        "total_products": total_products,
    }


# --- Products CRUD ---
@router.post("/products", response_model=ProductResponse, status_code=201)
def create_product(
    data: ProductCreate,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    slug = _slugify(data.name)
    existing = db.query(Product).filter(Product.slug == slug).first()
    if existing:
        slug = f"{slug}-{db.query(func.count(Product.id)).scalar() + 1}"

    product = Product(
        name=data.name,
        slug=slug,
        description=data.description,
        price=data.price,
        image_url=data.image_url,
        stock=data.stock,
        category_id=data.category_id,
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    product = db.query(Product).options(joinedload(Product.category)).filter(Product.id == product.id).first()
    return _product_to_response(product)


@router.put("/products/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    data: ProductUpdate,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produit non trouvé")

    update_data = data.model_dump(exclude_unset=True)
    if "name" in update_data:
        product.slug = _slugify(update_data["name"])
    for key, value in update_data.items():
        setattr(product, key, value)

    db.commit()
    db.refresh(product)

    product = db.query(Product).options(joinedload(Product.category)).filter(Product.id == product.id).first()
    return _product_to_response(product)


@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produit non trouvé")
    db.delete(product)
    db.commit()
    return {"detail": "Produit supprimé"}


# --- Categories CRUD ---
@router.post("/categories", response_model=CategoryResponse, status_code=201)
def create_category(
    data: CategoryCreate,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    slug = _slugify(data.name)
    existing = db.query(Category).filter(Category.slug == slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Cette catégorie existe déjà")

    category = Category(name=data.name, slug=slug, description=data.description)
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


@router.put("/categories/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    data: CategoryUpdate,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")

    update_data = data.model_dump(exclude_unset=True)
    if "name" in update_data:
        category.slug = _slugify(update_data["name"])
    for key, value in update_data.items():
        setattr(category, key, value)

    db.commit()
    db.refresh(category)
    return category


@router.delete("/categories/{category_id}")
def delete_category(
    category_id: int,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        raise HTTPException(status_code=404, detail="Catégorie non trouvée")
    db.delete(category)
    db.commit()
    return {"detail": "Catégorie supprimée"}


# --- Orders management ---
@router.get("/orders", response_model=list[OrderResponse])
def list_all_orders(
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    orders = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category))
        .order_by(Order.created_at.desc())
        .all()
    )
    return [_order_to_response(o) for o in orders]


@router.patch("/orders/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    data: OrderStatusUpdate,
    _: User = Depends(get_admin_user),
    db: Session = Depends(get_db),
):
    order = (
        db.query(Order)
        .options(joinedload(Order.items).joinedload(OrderItem.product).joinedload(Product.category))
        .filter(Order.id == order_id)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Commande non trouvée")
    order.status = data.status
    db.commit()
    db.refresh(order)
    return _order_to_response(order)
