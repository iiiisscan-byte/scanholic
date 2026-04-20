import sqlite3

conn = sqlite3.connect(r"server/database.db")
cursor = conn.cursor()

# Update banner 1 and 2 images
cursor.execute("UPDATE site_contents SET value = ? WHERE key = 'hero_slide_1_image'", ("http://localhost:8000/uploads/banner1.png",))
cursor.execute("UPDATE site_contents SET value = ? WHERE key = 'hero_slide_2_image'", ("http://localhost:8000/uploads/banner2.png",))

conn.commit()
conn.close()

print("Banners updated!")
