import sqlite3

def find_and_update_icon():
    conn = sqlite3.connect('server/database.db')
    cursor = conn.cursor()
    
    # 모든 서비스 출력하여 확인 (인코딩 방지 위해 바이트로도 출력)
    cursor.execute("SELECT id, title, icon FROM services")
    rows = cursor.fetchall()
    
    target_id = None
    for row_id, title, icon in rows:
        print(f"ID: {row_id}, Title: {title}, Current Icon: {icon}")
        if '사진' in title or '필름' in title:
            target_id = row_id
            print(f"Found target service: {title} (ID: {row_id})")
            
    if target_id:
        # 사진/필름에는 'Film' 아이콘이 적합
        cursor.execute("UPDATE services SET icon = ? WHERE id = ?", ('Film', target_id))
        conn.commit()
        print(f"Updated service ID {target_id} icon to 'Film'")
    else:
        print("Target service not found.")
        
    conn.close()

if __name__ == "__main__":
    find_and_update_icon()
