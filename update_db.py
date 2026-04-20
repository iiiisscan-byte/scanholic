import sqlite3

conn = sqlite3.connect(r"server/database.db")
cursor = conn.cursor()

new_text = "스캔홀릭은 다양한 스캔솔루션 구축경험을 바탕으로 개인, 기업, 공공기관의 유형 자산을 디지털 데이터로 변환하는 전문\n기업입니다."

cursor.execute("UPDATE site_contents SET value = ? WHERE key = 'about_text'", (new_text,))
conn.commit()
conn.close()

print("Database updated!")
