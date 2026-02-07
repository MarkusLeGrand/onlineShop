"""Seed the database with sample data."""
from app.database import SessionLocal, engine, Base
from app.models import User, Category, Product
from app.services.auth import hash_password


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).first():
            print("Database already seeded.")
            return

        # Admin user
        admin = User(
            email="admin@onlineshop.com",
            hashed_password=hash_password("admin123"),
            full_name="Administrateur",
            is_admin=True,
        )
        db.add(admin)

        # Test user
        user = User(
            email="user@onlineshop.com",
            hashed_password=hash_password("user123"),
            full_name="Jean Dupont",
        )
        db.add(user)

        # Categories
        categories = [
            Category(name="Électronique", slug="electronique", description="Appareils et gadgets électroniques"),
            Category(name="Vêtements", slug="vetements", description="Mode et habillement"),
            Category(name="Maison", slug="maison", description="Décoration et équipement maison"),
            Category(name="Sport", slug="sport", description="Équipement sportif"),
        ]
        db.add_all(categories)
        db.flush()

        # Products
        products = [
            Product(name="Casque Bluetooth", slug="casque-bluetooth", description="Casque sans fil avec réduction de bruit active, autonomie 30h.", price=79.99, stock=50, category_id=categories[0].id, image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"),
            Product(name="Clavier Mécanique", slug="clavier-mecanique", description="Clavier gaming RGB avec switches mécaniques.", price=129.99, stock=30, category_id=categories[0].id, image_url="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400"),
            Product(name="Souris Sans Fil", slug="souris-sans-fil", description="Souris ergonomique 2.4GHz, capteur haute précision.", price=34.99, stock=100, category_id=categories[0].id, image_url="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400"),
            Product(name="Webcam HD", slug="webcam-hd", description="Webcam 1080p avec microphone intégré pour visioconférence.", price=49.99, stock=40, category_id=categories[0].id, image_url="https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400"),
            Product(name="T-Shirt Premium", slug="t-shirt-premium", description="T-shirt en coton bio, coupe ajustée.", price=24.99, stock=200, category_id=categories[1].id, image_url="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"),
            Product(name="Jean Slim", slug="jean-slim", description="Jean slim stretch confortable, bleu délavé.", price=59.99, stock=80, category_id=categories[1].id, image_url="https://images.unsplash.com/photo-1542272604-787c3835535d?w=400"),
            Product(name="Veste Légère", slug="veste-legere", description="Veste coupe-vent imperméable, idéale mi-saison.", price=89.99, stock=45, category_id=categories[1].id, image_url="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400"),
            Product(name="Lampe de Bureau LED", slug="lampe-bureau-led", description="Lampe LED réglable avec port USB de charge.", price=39.99, stock=60, category_id=categories[2].id, image_url="https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=400"),
            Product(name="Coussin Décoratif", slug="coussin-decoratif", description="Coussin moelleux 45x45cm, housse lavable.", price=19.99, stock=150, category_id=categories[2].id, image_url="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400"),
            Product(name="Tapis de Yoga", slug="tapis-de-yoga", description="Tapis antidérapant 6mm, matière écologique.", price=29.99, stock=70, category_id=categories[3].id, image_url="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400"),
            Product(name="Haltères 10kg", slug="halteres-10kg", description="Paire d'haltères en néoprène, prise confortable.", price=44.99, stock=35, category_id=categories[3].id, image_url="https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400"),
            Product(name="Gourde Isotherme", slug="gourde-isotherme", description="Gourde 750ml, garde au chaud 12h et au froid 24h.", price=22.99, stock=90, category_id=categories[3].id, image_url="https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400"),
        ]
        db.add_all(products)

        db.commit()
        print("Database seeded successfully!")
        print("Admin: admin@onlineshop.com / admin123")
        print("User:  user@onlineshop.com / user123")

    finally:
        db.close()


if __name__ == "__main__":
    seed()
