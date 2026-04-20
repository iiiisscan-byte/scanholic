import sqlite3

def update_icons():
    conn = sqlite3.connect('server/database.db')
    cursor = conn.cursor()
    
    # ID 4: 사진/필름 디지털화 -> Film
    cursor.execute("UPDATE services SET icon = ? WHERE id = 4", ('Film',))
    
    # ID 5: 의료/산업용 필름 -> Scan (Lucide has Scan)
    cursor.execute("UPDATE services SET icon = ? WHERE id = 5", ('Scan',))
    
    # ID 6: 표본 -> Database or Box or Microscope
    cursor.execute("UPDATE services SET icon = ? WHERE id = 6", ('Microscope',))
    
    conn.commit()
    conn.close()
    print("Icons updated successfully.")

if __name__ == "__main__":
    update_icons()
