from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "OnlineShop API"
    DATABASE_URL: str = "sqlite:///./shop.db"
    SECRET_KEY: str = "change-me-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    CORS_ORIGINS: list[str] = ["http://localhost:5173"]

    class Config:
        env_file = ".env"


settings = Settings()
