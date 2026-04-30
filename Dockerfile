# syntax=docker/dockerfile:1

# ===========================
# 1️⃣ Backend build (Python)
# ===========================
FROM python:3.11-slim AS backend-builder
WORKDIR /app/backend

# Install build deps (gcc, libpq) – may be needed for MySQL driver
RUN apt-get update && apt-get install -y gcc libpq-dev && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# ===========================
# 2️⃣ Frontend build (Node)
# ===========================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package.json .
COPY frontend/package-lock.json* .
RUN npm install

COPY frontend/ .
RUN npm run build

# ===========================
# 3️⃣ Final image (FastAPI serving static files)
# ===========================
FROM python:3.11-slim AS final
WORKDIR /app

# Copy backend (including installed deps) from builder
COPY --from=backend-builder /app/backend /app

# Copy built frontend assets as static files
COPY --from=frontend-builder /app/frontend/dist /app/static

# Ensure runtime deps are present (MySQL driver already installed in backend-builder? Re‑install just in case)
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
