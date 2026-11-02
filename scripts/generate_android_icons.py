import os
from PIL import Image, ImageDraw

def generate_icons():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    logo_path = os.path.join(base_dir, 'public', 'logo.png')
    app_icon_path = os.path.join(base_dir, 'public', 'app-icon.png')
    
    if os.path.exists(app_icon_path):
        src_path = app_icon_path
    else:
        src_path = logo_path
        
    print(f"Using source icon: {src_path}")
    base_img = Image.open(src_path).convert('RGBA')
    
    # Target mipmap sizes:
    sizes = [
        ('mipmap-mdpi', 48, 108),
        ('mipmap-hdpi', 72, 162),
        ('mipmap-xhdpi', 96, 216),
        ('mipmap-xxhdpi', 144, 324),
        ('mipmap-xxxhdpi', 192, 432),
    ]
    
    res_dir = os.path.join(base_dir, 'android', 'app', 'src', 'main', 'res')
    
    # 1. Prepare Round Mask
    def make_round(img):
        w, h = img.size
        mask = Image.new('L', (w, h), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, w - 1, h - 1), fill=255)
        output = img.copy()
        output.putalpha(mask)
        return output

    round_master = make_round(base_img.resize((512, 512), Image.Resampling.LANCZOS))

    for folder, size, fg_size in sizes:
        target_dir = os.path.join(res_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
        
        # ic_launcher.png
        launcher_sq = base_img.resize((size, size), Image.Resampling.LANCZOS)
        launcher_sq.save(os.path.join(target_dir, 'ic_launcher.png'), 'PNG')
        
        # ic_launcher_round.png
        launcher_rd = round_master.resize((size, size), Image.Resampling.LANCZOS)
        launcher_rd.save(os.path.join(target_dir, 'ic_launcher_round.png'), 'PNG')
        
        # ic_launcher_foreground.png
        # Foreground is centered inside a transparent fg_size canvas
        fg_canvas = Image.new('RGBA', (fg_size, fg_size), (0, 0, 0, 0))
        fg_inner_size = int(fg_size * 0.72)
        fg_inner = base_img.resize((fg_inner_size, fg_inner_size), Image.Resampling.LANCZOS)
        offset = (fg_size - fg_inner_size) // 2
        fg_canvas.paste(fg_inner, (offset, offset), fg_inner)
        fg_canvas.save(os.path.join(target_dir, 'ic_launcher_foreground.png'), 'PNG')
        print(f"Generated {folder}: {size}x{size}, fg: {fg_size}x{fg_size}")

    # 2. Splash Screens
    bg_color = (11, 9, 20, 255) # #0b0914
    splash_targets = [
        ('drawable', 480, 800),
        ('drawable-port-mdpi', 320, 480),
        ('drawable-port-hdpi', 480, 800),
        ('drawable-port-xhdpi', 720, 1280),
        ('drawable-port-xxhdpi', 960, 1600),
        ('drawable-port-xxxhdpi', 1280, 1920),
        ('drawable-land-mdpi', 480, 320),
        ('drawable-land-hdpi', 800, 480),
        ('drawable-land-xhdpi', 1280, 720),
        ('drawable-land-xxhdpi', 1600, 960),
        ('drawable-land-xxxhdpi', 1920, 1280),
    ]

    for folder, width, height in splash_targets:
        target_dir = os.path.join(res_dir, folder)
        os.makedirs(target_dir, exist_ok=True)
        splash_img = Image.new('RGBA', (width, height), bg_color)
        
        # Logo in center (min dimension * 0.45)
        logo_dim = int(min(width, height) * 0.45)
        logo_resized = base_img.resize((logo_dim, logo_dim), Image.Resampling.LANCZOS)
        offset_x = (width - logo_dim) // 2
        offset_y = (height - logo_dim) // 2
        splash_img.paste(logo_resized, (offset_x, offset_y), logo_resized)
        
        splash_img.convert('RGB').save(os.path.join(target_dir, 'splash.png'), 'PNG')
        print(f"Generated splash for {folder}: {width}x{height}")

    print("All Chicken Ghost Android assets generated successfully!")

if __name__ == '__main__':
    generate_icons()
