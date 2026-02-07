import math

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.dependencies import get_db
from app.models.category import Category
from app.models.product import Product
from app.schemas.product import ProductListResponse, ProductResponse

router = APIRouter()


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


@router.get("/", response_model=ProductListResponse)
def list_products(
    page: int = 1,
    limit: int = 12,
    category: str | None = None,
    search: str | None = None,
    db: Session = Depends(get_db),
):
    query = db.query(Product).options(joinedload(Product.category)).filter(Product.is_active == True)

    if category:
        query = query.join(Category).filter(Category.slug == category)

    if search:
        query = query.filter(Product.name.ilike(f"%{search}%"))

    total = query.count()
    pages = math.ceil(total / limit) if limit > 0 else 1
    products = query.offset((page - 1) * limit).limit(limit).all()

    return {
        "products": [_product_to_response(p) for p in products],
        "total": total,
        "page": page,
        "pages": pages,
    }


@router.get("/{slug}", response_model=ProductResponse)
def get_product(slug: str, db: Session = Depends(get_db)):
    product = (
        db.query(Product)
        .options(joinedload(Product.category))
        .filter(Product.slug == slug, Product.is_active == True)
        .first()
    )
    if not product:
        raise HTTPException(status_code=404, detail="Produit non trouvé")
    return _product_to_response(product)
