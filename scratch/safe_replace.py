import os

def safe_replace():
    src_dir = 'src'
    target = 'http://localhost:8000'
    replacement = ''
    
    for root, dirs, files in os.walk(src_dir):
        for file in files:
            if file.endswith('.tsx'):
                file_path = os.path.join(root, file)
                
                # UTF-8로 읽어서 수정 후 저장
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if target in content:
                        new_content = content.replace(target, replacement)
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"수정됨: {file_path}")
                except Exception as e:
                    print(f"오류 발생 ({file_path}): {e}")

if __name__ == "__main__":
    safe_replace()
