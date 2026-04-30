import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Expected MySQL connection string, e.g. mysql+pymysql://user:password@host:3306/dbname
DATABASE_URL = os.getenv("MYSQL_URL", "sqlite:///./test.db")  # fallback to SQLite for local dev

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
