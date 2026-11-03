import os
import shutil
from PIL import Image

upload_dir = r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d\.user_uploaded"
out_dir = r"D:\Work\chicken-ghost\public\images\menu"
os.makedirs(out_dir, exist_ok=True)

# 1. Direct copy of platters & meals
platters = {
    "media_1793699970742_afd094d3.jpg": "sawa-sawa.jpg",
    "media_1793699970742_8b0d3a82.jpg": "10-sliders.jpg",
    "media_1793699970748_83de6a66.jpg": "chicken-ghost-tray.jpg",
    "media_1793699970754_9d2e7486.jpg": "level-elwahsh.jpg",
    "media_1793699970762_638006d6.jpg": "mix-elsheba.jpg",
    "media_1793700829130_136c28d2.jpg": "ali-clay.jpg",
    "media_1793700829141_064fc9d9.jpg": "sohab-bondok.jpg"
}

for src_file, dst_name in platters.items():
    src_path = os.path.join(upload_dir, src_file)
    dst_path = os.path.join(out_dir, dst_name)
    if os.path.exists(src_path):
        shutil.copy(src_path, dst_path)
        print(f"Copied {dst_name}")

# 2. Crop Sandwiches from Image 6 (768 x 1024)
# 3 columns, 3 rows
im6 = Image.open(os.path.join(upload_dir, "media_1793700829127_a7cccfa7.jpg"))
W, H = im6.size

# Row 1 (y: ~ 10 to 330)
# Col 1: left 0 to 256
# Col 2: mid 256 to 512
# Col 3: right 512 to 768

# Col 1: Chicken Monster (left)
im6.crop((15, 15, 260, 340)).save(os.path.join(out_dir, "chicken-monster.jpg"))
# Col 2: Chicken Killer (mid)
im6.crop((260, 15, 510, 340)).save(os.path.join(out_dir, "chicken-killer.jpg"))
# Col 3: Chicken Classic (right)
im6.crop((510, 15, 755, 340)).save(os.path.join(out_dir, "chicken-classic.jpg"))

# Row 2 (y: ~ 350 to 670)
# Col 1: Chicken Ghost (left)
im6.crop((15, 350, 260, 670)).save(os.path.join(out_dir, "chicken-ghost.jpg"))
# Col 2: Chicken Fighter (mid)
im6.crop((260, 350, 510, 670)).save(os.path.join(out_dir, "chicken-fighter.jpg"))
# Col 3: Chicken Boaboa (right)
im6.crop((510, 350, 755, 670)).save(os.path.join(out_dir, "chicken-boaboa.jpg"))

# Row 3 (y: ~ 680 to 1000)
# Col 1: Chicken Roll (left)
im6.crop((15, 700, 260, 1000)).save(os.path.join(out_dir, "chicken-roll.jpg"))
# Col 2: Nashfel Roll (mid)
im6.crop((260, 700, 510, 1000)).save(os.path.join(out_dir, "nashfel-roll.jpg"))
# Col 3: Nashfel Fire (right)
im6.crop((510, 680, 755, 1000)).save(os.path.join(out_dir, "nashfel-fire.jpg"))
print("Cropped all 9 sandwiches & rolls successfully!")

# 3. Crop Loaded Fries & Meals from Image 8 (768 x 1024)
im8 = Image.open(os.path.join(upload_dir, "media_1793700829135_a77a5c65.jpg"))
# Row 1 (Fries): y ~ 20 to 260
# Col 1 (left): Sinister Frise
im8.crop((20, 20, 260, 260)).save(os.path.join(out_dir, "sinister-frise.jpg"))
# Col 2 (mid): Cursed Frise
im8.crop((260, 20, 510, 260)).save(os.path.join(out_dir, "cursed-frise.jpg"))
# Col 3 (right): Ghost Frise
im8.crop((510, 20, 755, 260)).save(os.path.join(out_dir, "ghost-frise.jpg"))

# Row 2 (Meals): y ~ 270 to 570
# Left: Mafia Meal
im8.crop((30, 275, 490, 565)).save(os.path.join(out_dir, "mafia-meal.jpg"))
# Right: King Meal
im8.crop((490, 275, 745, 565)).save(os.path.join(out_dir, "king-meal.jpg"))
print("Cropped loaded fries and meals successfully!")
