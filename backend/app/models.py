from datetime import datetime
from sqlalchemy import Column, String, Integer, DateTime
from .database import Base

class Session(Base):
    __tablename__ = "sessions"
    id = Column(String(36), primary_key=True, index=True)  # UUID string
    created_at = Column(DateTime, default=datetime.utcnow)
    last_seen = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    free_requests_remaining = Column(Integer, default=10)
    total_requests = Column(Integer, default=0)
    ad_disabled_until = Column(DateTime, nullable=True)

    def is_ad_disabled(self) -> bool:
        if self.ad_disabled_until is None:
            return False
        return self.ad_disabled_until > datetime.utcnow()
