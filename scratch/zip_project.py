import os
import zipfile
from datetime import datetime

def create_zip():
    project_root = r"c:\Users\issca\OneDrive\바탕 화면\스캔홀릭 웹사이트\스캔홀릭_0403"
    desktop_path = r"c:\Users\issca\OneDrive\바탕 화면"
    
    # 생성될 파일명: scanholic_backup_YYYYMMDD_HHMMSS.zip
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_filename = f"scanholic_backup_{timestamp}.zip"
    zip_path = os.path.join(desktop_path, zip_filename)
    
    exclude_dirs = {'.git', 'node_modules', 'dist', '__pycache__', '.venv'}
    exclude_files = {zip_filename}

    print(f"압축을 시작합니다: {zip_path}")
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(project_root):
            # 제외할 디렉토리 필터링
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if file in exclude_files:
                    continue
                    
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, project_root)
                zipf.write(file_path, arcname)
                print(f"추가됨: {arcname}")

    print(f"\n압축 완료! 파일 위치: {zip_path}")

if __name__ == "__main__":
    create_zip()
