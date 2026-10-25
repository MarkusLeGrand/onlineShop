# OnlineShop

> Boutique e-commerce full-stack : catalogue, panier, commandes et back-office admin, avec une API REST FastAPI et un front React 19 + TypeScript.

## À propos

OnlineShop est une application de vente en ligne complète, découpée en deux parties :

- un **backend** Python/FastAPI qui expose une API REST (`/api/...`) sécurisée par JWT, avec persistance SQLAlchemy (SQLite par défaut) ;
- un **frontend** React + TypeScript (Vite, Tailwind CSS v4) qui consomme cette API via un proxy de développement.

Le projet couvre tout le parcours client (inscription, connexion, navigation dans le catalogue, panier, passage de commande, historique) ainsi qu'un espace d'administration (statistiques, gestion des produits, suivi des commandes). Le front propose aussi plusieurs variantes de design de la page d'accueil et de la fiche produit, regroupées sur une page `/showcase`.

## Fonctionnalités

### Côté client
- **Authentification** : inscription, connexion (OAuth2 password flow → JWT Bearer), récupération du profil (`/api/auth/me`). Mots de passe hachés avec bcrypt.
- **Catalogue** : liste paginée (12 produits par page), filtre par catégorie (slug), recherche par nom, tri côté client (récents, prix croissant/décroissant, nom), vue grille ou liste.
- **Fiche produit** accessible par slug ; la variante V2 ajoute galerie d'images, sélecteurs de couleur/taille (visuels), onglets caractéristiques/avis et produits liés (les avis sont des données statiques côté front).
- **Panier persistant côté serveur** (par utilisateur) : ajout, modification de quantité, suppression, vidage ; vérification du stock à l'ajout.
- **Commande** : création à partir du panier avec adresse de livraison, contrôle et décrément du stock, prix figé au moment de l'achat (`price_at_time`), vidage du panier.
- **Historique des commandes** de l'utilisateur connecté.

### Côté administrateur
- **Tableau de bord** : nombre de commandes, chiffre d'affaires total, nombre d'utilisateurs et de produits (`/api/admin/stats`).
- **Gestion des produits** : création, modification, suppression, slug généré automatiquement.
- **Gestion des catégories** (API) : création, modification, suppression.
- **Gestion des commandes** : liste de toutes les commandes et changement de statut (en attente, payée, expédiée, livrée, annulée).
- Routes front protégées (`ProtectedRoute`, `AdminRoute`) et dépendances FastAPI `get_current_user` / `get_admin_user` côté API.

### Interface
- Trois variantes de page d'accueil (`/`, `/v2`, `/v3`) et trois variantes de fiche produit (`/products/:slug`, `/v2/products/:slug`, `/v3/products/:slug`), présentées sur `/showcase`.
- Bibliothèque de composants UI maison (`components/ui/` : Modal, Tabs, Accordion, Tooltip, Skeleton, TiltCard, Parallax, TypeWriter, Marquee, etc.).
- Notifications avec `react-hot-toast`, icônes `lucide-react`.

## Stack technique

| Couche | Technologies |
|---|---|
| Frontend | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4 (`@tailwindcss/vite`), React Router 7, Zustand 5, Axios, lucide-react, react-hot-toast, ESLint 9 |
| Backend | Python, FastAPI, Uvicorn, SQLAlchemy 2, Pydantic 2 / pydantic-settings, python-jose (JWT HS256), bcrypt, python-multipart |
| Base de données | SQLite par défaut (configurable via `DATABASE_URL`) |

## Installation & lancement

### Prérequis
- Python 3.10+ (le code utilise la syntaxe `X | None`)
- Node.js et npm

### 1. Backend

```bash
cd backend
python -m venv .venv
# Windows : .venv\Scripts\activate    |    macOS/Linux : source .venv/bin/activate
pip install -r requirements.txt

# Variables d'environnement
cp .env.example .env        # puis modifiez SECRET_KEY

# Création des tables + données de démo (obligatoire au premier lancement)
python -m app.seed

# Lancement de l'API sur http://localhost:8000
uvicorn app.main:app --reload
```

Variables disponibles dans `backend/.env.example` :

| Variable | Valeur par défaut | Rôle |
|---|---|---|
| `SECRET_KEY` | `change-me-in-production` | Clé de signature des JWT — **à changer** |
| `DATABASE_URL` | `sqlite:///./shop.db` | URL SQLAlchemy de la base |
| `CORS_ORIGINS` | `["http://localhost:5173"]` | Origines autorisées |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Durée de validité du token |

La documentation interactive de l'API est générée par FastAPI sur `http://localhost:8000/docs`. Un endpoint de santé est disponible sur `/api/health`.

> Les tables sont créées par `app/seed.py` (`Base.metadata.create_all`) : lancez le seed au moins une fois avant de démarrer l'API sur une base vide.

### 2. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev        # http://localhost:5173
```

Le serveur Vite redirige `/api` vers `http://localhost:8000` (voir `vite.config.ts`), le backend doit donc tourner en parallèle.

Autres scripts : `npm run build` (vérification TypeScript + build de production), `npm run preview`, `npm run lint`.

## Comptes de démo

Le script `backend/app/seed.py` crée, sur une base vide, 4 catégories, 12 produits et les deux comptes suivants. **Ce sont des comptes de démonstration destinés uniquement à un environnement local** :

| Rôle | Email | Mot de passe |
|---|---|---|
| Administrateur | `admin@onlineshop.com` | `admin123` |
| Client | `user@onlineshop.com` | `user123` |

## Architecture

```
onlineShop/
├── backend/
│   ├── requirements.txt
│   ├── .env.example
│   └── app/
│       ├── main.py          # App FastAPI, CORS, montage des routers
│       ├── config.py        # Settings (pydantic-settings, lit .env)
│       ├── database.py      # Engine + SessionLocal SQLAlchemy
│       ├── dependencies.py  # get_db, get_current_user, get_admin_user
│       ├── models/          # User, Category, Product, CartItem, Order, OrderItem
│       ├── schemas/         # Schémas Pydantic (entrée / sortie)
│       ├── routers/         # auth, products, categories, cart, orders, admin
│       ├── services/auth.py # Hash bcrypt + création / décodage JWT
│       └── seed.py          # Création des tables + données de démo
└── frontend/
    ├── vite.config.ts       # Plugins React + Tailwind, proxy /api
    └── src/
        ├── api/client.ts    # Instance Axios (token Bearer, redirection sur 401)
        ├── stores/          # Zustand : authStore, cartStore
        ├── pages/           # Home(V2/V3), ProductList, ProductDetail(V2/V3), Cart,
        │                    # Checkout, Orders, Login, Register, Showcase, admin/*
        ├── components/      # layout/, home/, product/, ui/, routes protégées
        └── types/           # Types TS partagés (user, product, cart, order…)
```

**Flux** : le front appelle `/api/...` via Axios ; l'intercepteur ajoute le JWT stocké dans `localStorage` et renvoie vers `/login` en cas de 401. Côté API, chaque router FastAPI s'appuie sur les dépendances `get_db` et `get_current_user`/`get_admin_user`, manipule les modèles SQLAlchemy et renvoie des schémas Pydantic. Le panier et les commandes sont stockés en base, liés à l'utilisateur.

**Modèle de données** : `User` 1–n `CartItem` / `Order` ; `Order` 1–n `OrderItem` (avec prix figé) ; `Product` n–1 `Category`.

## Pistes d'amélioration

- Valider les entrées côté API : quantités strictement positives dans le panier, prix/stock positifs, statut de commande restreint à une énumération, longueur minimale du mot de passe.
- Vérifier le stock sur la quantité cumulée du panier, et rendre le décrément de stock transactionnel (verrouillage) pour éviter les surventes concurrentes.
- Créer les tables au démarrage ou, mieux, utiliser Alembic (déjà présent dans `requirements.txt`) pour versionner le schéma.
- Gérer la suppression de produits/catégories référencés (soft delete via `is_active`, contraintes de clés étrangères).
- Stocker les montants en `Decimal`/centimes plutôt qu'en `float`.
- Rendre l'URL de l'API configurable en production (`VITE_API_URL` est défini dans `.env.example` mais le client utilise le chemin relatif `/api`).
- Ajouter des tests (pytest pour l'API, Vitest/Testing Library pour le front), un vrai système d'avis et un module de paiement.
- Conteneuriser (Docker Compose front + API + base) et ajouter une CI.
