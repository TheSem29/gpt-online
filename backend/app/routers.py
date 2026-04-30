from fastapi import APIRouter, Depends, Request, Response, HTTPException
from sqlalchemy.orm import Session as DBSession
from datetime import datetime, timedelta
import uuid

from . import models, schemas, database

router = APIRouter(prefix="/api")

# Placeholder OpenRouter call – replace with real HTTP request if needed
async def generate_answer(prompt: str, model_name: str) -> str:
    # In production you would call OpenRouter API here using your API key.
    # For now we return a mock response.
    return f"[Mock response from {model_name}] {prompt}"

def get_or_create_session(db: DBSession, request: Request, response: Response) -> models.Session:
    session_id = request.cookies.get("session_id")
    if session_id:
        session_obj = db.query(models.Session).filter(models.Session.id == session_id).first()
        if session_obj:
            # Update last_seen timestamp
            session_obj.last_seen = datetime.utcnow()
            db.commit()
            return session_obj
    # Create new session
    new_id = str(uuid.uuid4())
    session_obj = models.Session(id=new_id)
    db.add(session_obj)
    db.commit()
    # Set cookie (HttpOnly, path=/)
    response.set_cookie(key="session_id", value=new_id, httponly=True, samesite="lax")
    return session_obj

@router.post("/chat", response_model=schemas.ChatResponse)
async def chat_endpoint(request_body: schemas.ChatRequest, request: Request, response: Response, db: DBSession = Depends(database.SessionLocal)):
    session_obj = get_or_create_session(db, request, response)

    # Increment request counters
    session_obj.total_requests += 1
    session_obj.free_requests_remaining = max(session_obj.free_requests_remaining - 1, 0)
    db.commit()

    # Determine which model to use
    if session_obj.free_requests_remaining > 0:
        model_name = "15B"
    else:
        model_name = "5B"

    # Generate answer (placeholder)
    answer = await generate_answer(request_body.prompt, model_name)

    # Determine ad flags – every second request shows banner, every third shows popup
    ad_banner = False
    ad_popup = False
    if not session_obj.is_ad_disabled():
        if session_obj.total_requests % 2 == 0:
            ad_banner = True
        if session_obj.total_requests % 3 == 0:
            ad_popup = True

    return schemas.ChatResponse(answer=answer, adBanner=ad_banner, adPopup=ad_popup)
