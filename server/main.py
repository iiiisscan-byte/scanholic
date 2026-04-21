import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import uuid
from fastapi import UploadFile, File
from fastapi.staticfiles import StaticFiles
from supabase import create_client, Client
from typing import Dict, Any, List

# .env 파일에서 설정 로드
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
load_dotenv(dotenv_path=env_path)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Supabase 클라이언트 초기화
if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# 업로드 폴더 설정 (로컬 개발용)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if os.environ.get("VERCEL"):
    UPLOAD_DIR = "/tmp/uploads"
else:
    UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

try:
    os.makedirs(UPLOAD_DIR, exist_ok=True)
except Exception as e:
    print(f"Failed to create upload directory: {e}")

# Gemini 설정
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

# FastAPI 앱 초기화
app = FastAPI(title="ScanHolic AI Backend (Supabase)")

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Pydantic 모델들
class ChatRequest(BaseModel):
    message: str

class SettingsUpdateRequest(BaseModel):
    primaryColor: str
    backgroundColor: str
    fontFamily: str
    siteTitle: str

class ServiceItem(BaseModel):
    id: int = None
    title: str
    description: str
    icon: str = ""
    image_url: str = ""
    scenario: str = ""

class InquiryCreate(BaseModel):
    name: str
    company: str = ""
    service: str = ""
    contact: str
    email: str = ""
    message: str

class InquiryStatusUpdate(BaseModel):
    status: str

class PopupItem(BaseModel):
    id: int = None
    title: str
    content: str
    is_active: int = 1

class AdminLoginRequest(BaseModel):
    username: str
    password: str

class AdminCredentialsUpdateRequest(BaseModel):
    current_password: str
    new_username: str
    new_password: str

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_extension = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_extension}"
        
        # 파일 내용 읽기
        contents = await file.read()
        
        # Supabase 스토리지 'images' 버킷에 업로드
        # (주의: 사용자가 Supabase 대시보드에서 'images' 버킷을 Public으로 생성해야 합니다.)
        res = supabase.storage.from_("images").upload(
            path=file_name,
            file=contents,
            file_options={"content-type": file.content_type}
        )
        
        # 업로드된 파일의 공용 URL 가져오기
        public_url = supabase.storage.from_("images").get_public_url(file_name)
        
        return {"imageUrl": public_url}
    except Exception as e:
        print(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"이미지 업로드 실패: {str(e)}")

# 디자인 설정 조회 API
@app.get("/api/settings")
async def get_settings():
    response = supabase.table("site_settings").select("*").execute()
    return {row['key']: row['value'] for row in response.data}

# 디자인 설정 업데이트 API
@app.post("/api/settings")
async def update_settings(settings: SettingsUpdateRequest):
    data = []
    for key, value in settings.dict().items():
        data.append({"key": key, "value": str(value)})
    
    # Upsert (key가 중복되면 업데이트)
    supabase.table("site_settings").upsert(data).execute()
    return {"message": "Settings updated successfully"}

# --- 콘텐츠 관리 API ---
@app.get("/api/contents")
async def get_contents():
    response = supabase.table("site_contents").select("*").execute()
    return {row['key']: row['value'] for row in response.data}

@app.post("/api/contents")
async def update_contents(request: Dict[str, Any]):
    data = []
    for key, value in request.items():
        if value is not None:
            data.append({"key": key, "value": str(value)})
    
    if data:
        supabase.table("site_contents").upsert(data).execute()
    return {"message": "Contents updated successfully"}

# --- 서비스 관리 API ---
@app.get("/api/services")
async def get_services():
    response = supabase.table("services").select("*").order("id").execute()
    return response.data

@app.post("/api/services")
async def add_service(service: ServiceItem):
    data = service.dict()
    if "id" in data: del data["id"]
    supabase.table("services").insert(data).execute()
    return {"message": "Service added successfully"}

@app.put("/api/services/{service_id}")
async def update_service(service_id: int, service: ServiceItem):
    data = service.dict()
    if "id" in data: del data["id"]
    supabase.table("services").update(data).eq("id", service_id).execute()
    return {"message": "Service updated successfully"}

@app.delete("/api/services/{service_id}")
async def delete_service(service_id: int):
    supabase.table("services").delete().eq("id", service_id).execute()
    return {"message": "Service deleted successfully"}

# --- 팝업 관리 API ---
@app.get("/api/popups")
async def get_active_popups():
    response = supabase.table("popups").select("*").eq("is_active", 1).execute()
    return response.data

@app.get("/api/admin/popups")
async def get_all_popups():
    response = supabase.table("popups").select("*").order("id", desc=True).execute()
    return response.data

@app.post("/api/admin/popups")
async def create_popup(popup: PopupItem):
    data = popup.dict()
    if "id" in data: del data["id"]
    supabase.table("popups").insert(data).execute()
    return {"message": "Popup created"}

@app.put("/api/admin/popups/{popup_id}")
async def update_popup(popup_id: int, popup: PopupItem):
    data = popup.dict()
    if "id" in data: del data["id"]
    supabase.table("popups").update(data).eq("id", popup_id).execute()
    return {"message": "Popup updated"}

@app.delete("/api/admin/popups/{popup_id}")
async def delete_popup(popup_id: int):
    supabase.table("popups").delete().eq("id", popup_id).execute()
    return {"message": "Popup deleted"}

# --- 상담 내역 API ---
@app.get("/api/admin/inquiries")
async def get_inquiries():
    response = supabase.table("inquiries").select("*").order("created_at", desc=True).execute()
    # 날짜 필드 이름 통일 (DB는 created_at, 프론트는 date 기대)
    return [{**r, "date": r["created_at"]} for r in response.data]

@app.put("/api/admin/inquiries/{inquiry_id}/status")
async def update_inquiry_status(inquiry_id: int, update: InquiryStatusUpdate):
    supabase.table("inquiries").update({"status": update.status}).eq("id", inquiry_id).execute()
    return {"message": "Inquiry status updated successfully"}

@app.delete("/api/admin/inquiries/{inquiry_id}")
async def delete_inquiry(inquiry_id: int):
    supabase.table("inquiries").delete().eq("id", inquiry_id).execute()
    return {"message": "Inquiry deleted successfully"}

@app.post("/api/public/inquiry")
async def create_inquiry(inquiry: InquiryCreate):
    supabase.table("inquiries").insert(inquiry.dict()).execute()
    return {"message": "상담 예약이 접수되었습니다. 곧 연락드리겠습니다!"}

@app.post("/api/chat")
async def chat_with_ai(request: ChatRequest):
    if not GEMINI_API_KEY:
        return {"response": "🚨 API 키가 설정되지 않았습니다."}
    
    try:
        model = genai.GenerativeModel('gemini-3-flash-preview') # 2026년 최신 모델 적용
        system_prompt = """
        당신은 '스캔홀릭(ScanHolic)'의 전문 AI 상담사입니다. 
        문서, 도면, 사진, 특수 필름 디지털화 전문 기업입니다.
        친절하고 전문적으로 답변하며 상세 견적은 '상담문의'를 안내하세요.
        """
        response = model.generate_content(f"{system_prompt}\n\n사용자 질문: {request.message}")
        return {"response": response.text}
    except Exception as e:
        return {"response": f"🚨 응답 오류 발생: {str(e)}"}

import hashlib

@app.post("/api/admin/login")
async def admin_login(req: AdminLoginRequest):
    password_hash = hashlib.sha256(req.password.encode()).hexdigest()
    response = supabase.table("admins").select("id").eq("username", req.username).eq("password_hash", password_hash).execute()
    
    if response.data:
        return {"success": True, "token": "admin-token-valid"}
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")

@app.put("/api/admin/credentials")
async def update_admin_credentials(req: AdminCredentialsUpdateRequest):
    current_hash = hashlib.sha256(req.current_password.encode()).hexdigest()
    response = supabase.table("admins").select("id").eq("password_hash", current_hash).execute()
    
    if not response.data:
        raise HTTPException(status_code=401, detail="현재 패스워드가 올바르지 않습니다.")
        
    new_hash = hashlib.sha256(req.new_password.encode()).hexdigest()
    supabase.table("admins").update({"username": req.new_username, "password_hash": new_hash}).eq("id", response.data[0]["id"]).execute()
    return {"message": "관리자 정보가 성공적으로 변경되었습니다."}

from fastapi.responses import FileResponse

# 빌드된 프론트엔드 파일 경로
DIST_DIR = os.path.join(os.path.dirname(BASE_DIR), "dist")

@app.get("/{rest_of_path:path}")
async def serve_frontend(rest_of_path: str):
    if rest_of_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API route not found")
        
    static_file = os.path.join(DIST_DIR, rest_of_path)
    if os.path.isfile(static_file):
        return FileResponse(static_file)
    
    index_file = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "Frontend build not found. Please run 'npm run build' first."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
