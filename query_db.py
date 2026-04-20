import sqlite3
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

conn = sqlite3.connect(r"server/database.db")
cursor = conn.cursor()

print("--- contents ---")
cursor.execute("SELECT key, value FROM site_contents")
for row in cursor.fetchall():
    print(row)

conn.close()
