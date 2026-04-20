import sqlite3
import os

db_path = os.path.join('server', 'database.db')
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

data = [
    ('hero_slide_1_title', '압도적인 속도와 정밀함, 대량 스캔의 완성'),
    ('hero_slide_1_subtitle', '최첨단 고속 스캐너와 전문 공정으로 완벽한 디지털 환경을 구축합니다.'),
    ('hero_slide_1_image', 'http://localhost:8000/uploads/hero-scanner.png')
]

for key, value in data:
    cursor.execute("REPLACE INTO site_contents (key, value) VALUES (?, ?)", (key, value))

conn.commit()
conn.close()
print("Banner 1 updated in database.")
