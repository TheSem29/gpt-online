from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    answer: str
    adBanner: bool | None = None
    adPopup: bool | None = None
