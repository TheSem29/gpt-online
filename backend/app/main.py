import os
import uuid
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, Request, Response, HTTPException
from fastapi.responses import JSONResponse
from starlette.middleware.sessions import SessionMiddleware

from .database import get_db, SessionLocal
from . import models, schemas, routers

app = FastAPI(title="GPT Online Backend")

# Simple secret for signed cookies (in production use a strong secret)
app.add_middleware(SessionMiddleware, secret_key=os.getenv("SESSION_SECRET", "change_me"), session_cookie="session_id")

# Create DB tables on startup
@app.on_event("startup")
async def startup():
    # Ensure tables exist
    from . import models as m
    engine = SessionLocal().bind
    m.Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db_dep():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Include routers
app.include_router(routers.router)
