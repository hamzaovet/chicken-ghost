# -*- coding: utf-8 -*-
"""
Generate the Official Brand Logo for Chicken Ghost (تشيكن جوست)
Features:
- Midnight Phantom Obsidian (#0b0914) circle with Neon Electric Cyan (#00f2fe) and Spicy Ghost Orange (#ff6b00) rims
- Charismatic Ghost Chicken Icon in the center with golden crispy drumstick, phantom eyes, and spicy flame crest
- High-res rendering with antialiased Lanczos downsampling
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

def generate_ghost_logo(output_size=512):
    size = output_size * 2
    cx, cy = size // 2, size // 2
    r = size // 2 - 24
    
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Palette
    BG_OBSIDIAN = (11, 9, 20, 255)       # #0b0914
    BG_MIDNIGHT = (19, 15, 36, 255)      # #130f24
    NEON_CYAN   = (0, 242, 254, 255)     # #00f2fe
    ELECTRIC_BL = (79, 172, 254, 255)    # #4facfe
    SPICY_ORANGE= (255, 107, 0, 255)     # #ff6b00
    CRISPY_GOLD = (255, 174, 0, 255)     # #ffae00
    GHOST_WHITE = (248, 250, 252, 255)   # #f8fafc
    PURPLE_GLOW = (138, 43, 226, 255)    # #8a2be2
    
    # 1. Outer Glow and Border Rings
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=BG_OBSIDIAN, outline=NEON_CYAN, width=14)
    draw.ellipse([cx - r + 18, cy - r + 18, cx + r - 18, cy + r - 18], outline=SPICY_ORANGE, width=6)
    draw.ellipse([cx - r + 32, cy - r + 32, cx + r - 32, cy + r - 32], fill=BG_MIDNIGHT, outline=PURPLE_GLOW, width=3)
    
    # Outer decorative neon dots
    num_dots = 40
    dot_radius = r - 10
    for i in range(num_dots):
        angle = 2 * math.pi * i / num_dots
        dx = cx + dot_radius * math.cos(angle)
        dy = cy + dot_radius * math.sin(angle)
        color = NEON_CYAN if i % 2 == 0 else SPICY_ORANGE
        draw.ellipse([dx - 5, dy - 5, dx + 5, dy + 5], fill=color)
        
    # 2. Ghost Flame / Chicken Rooster Crest on Top
    # Flame rooster comb (Spicy Orange + Gold)
    crest_pts_1 = [(cx - 50, cy - 170), (cx - 70, cy - 250), (cx - 20, cy - 220)]
    crest_pts_2 = [(cx - 20, cy - 220), (cx, cy - 290), (cx + 30, cy - 220)]
    crest_pts_3 = [(cx + 20, cy - 220), (cx + 70, cy - 260), (cx + 50, cy - 170)]
    draw.polygon(crest_pts_1, fill=SPICY_ORANGE)
    draw.polygon(crest_pts_2, fill=CRISPY_GOLD)
    draw.polygon(crest_pts_3, fill=SPICY_ORANGE)
    
    # 3. Floating Ghost Body (Ghost Chicken Silhouette)
    # Head & Body: smooth wavy ghost shape
    ghost_w = 170
    ghost_top = cy - 180
    ghost_bot = cy + 130
    
    # Draw Ghost Head / Body Dome
    draw.ellipse([cx - ghost_w, ghost_top, cx + ghost_w, ghost_top + ghost_w * 2], fill=GHOST_WHITE)
    draw.rectangle([cx - ghost_w, ghost_top + ghost_w, cx + ghost_w, ghost_bot], fill=GHOST_WHITE)
    
    # Ghost wavy bottom ripples (3 waves)
    wave_r = ghost_w // 3
    for k in range(3):
        wx = cx - ghost_w + k * (wave_r * 2) + wave_r
        draw.ellipse([wx - wave_r - 2, ghost_bot - wave_r, wx + wave_r + 2, ghost_bot + wave_r], fill=GHOST_WHITE)
        
    # 4. Cute / Badass Glowing Ghost Eyes & Beak
    eye_y = cy - 70
    # Left Eye (Glowing Cyan)
    draw.ellipse([cx - 85, eye_y - 25, cx - 35, eye_y + 25], fill=BG_OBSIDIAN, outline=NEON_CYAN, width=6)
    draw.ellipse([cx - 70, eye_y - 12, cx - 50, eye_y + 12], fill=NEON_CYAN)
    
    # Right Eye (Glowing Cyan)
    draw.ellipse([cx + 35, eye_y - 25, cx + 85, eye_y + 25], fill=BG_OBSIDIAN, outline=NEON_CYAN, width=6)
    draw.ellipse([cx + 50, eye_y - 12, cx + 70, eye_y + 12], fill=NEON_CYAN)
    
    # Rooster Beak (Spicy Crispy Orange)
    beak_pts = [(cx - 28, eye_y + 15), (cx + 28, eye_y + 15), (cx, eye_y + 55)]
    draw.polygon(beak_pts, fill=SPICY_ORANGE, outline=CRISPY_GOLD)
    
    # Rooster wattle (spicy red droplets under beak)
    draw.ellipse([cx - 15, eye_y + 50, cx + 15, eye_y + 80], fill=(230, 0, 0, 255))
    
    # 5. Golden Crispy Fried Chicken Drumstick Held by Ghost
    drum_cx = cx
    drum_cy = cy + 130
    # Drumstick bone
    draw.line([(drum_cx - 40, drum_cy + 30), (drum_cx - 80, drum_cy + 60)], fill=GHOST_WHITE, width=12)
    draw.ellipse([drum_cx - 90, drum_cy + 45, drum_cx - 70, drum_cy + 65], fill=GHOST_WHITE)
    draw.ellipse([drum_cx - 85, drum_cy + 60, drum_cx - 65, drum_cy + 80], fill=GHOST_WHITE)
    
    # Crispy Meat Bulge
    draw.ellipse([drum_cx - 45, drum_cy - 25, drum_cx + 75, drum_cy + 55], fill=CRISPY_GOLD, outline=SPICY_ORANGE, width=6)
    # Crispy breading flakes on drumstick
    for flk in [(drum_cx - 10, drum_cy), (drum_cx + 20, drum_cy - 10), (drum_cx + 15, drum_cy + 25), (drum_cx + 45, drum_cy + 10)]:
        draw.ellipse([flk[0] - 5, flk[1] - 4, flk[0] + 5, flk[1] + 4], fill=SPICY_ORANGE)
        
    # 6. Bottom Banner / Ribbon: "CHICKEN GHOST"
    banner_w = 560
    banner_h = 75
    banner_y = cy + 225
    draw.rounded_rectangle([cx - banner_w // 2, banner_y, cx + banner_w // 2, banner_y + banner_h],
                           radius=22, fill=SPICY_ORANGE, outline=NEON_CYAN, width=4)
    
    try:
        f_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 46)
        draw.text((cx, banner_y + banner_h // 2), "CHICKEN GHOST", font=f_title, fill=GHOST_WHITE, anchor="mm")
    except Exception:
        pass
        
    # Subtext "CRISPY & SPICY"
    try:
        f_sub = ImageFont.truetype("C:/Windows/Fonts/georgiab.ttf", 26)
        draw.text((cx, banner_y + banner_h + 35), "ORIGINAL CRISPY • 2026", font=f_sub, fill=NEON_CYAN, anchor="mm")
    except Exception:
        pass
        
    final_img = img.resize((output_size, output_size), Image.Resampling.LANCZOS)
    return final_img

if __name__ == "__main__":
    logo = generate_ghost_logo(512)
    public_dir = r"d:\Work\chicken-ghost\public"
    brain_dir = r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d"
    
    os.makedirs(public_dir, exist_ok=True)
    logo.save(os.path.join(public_dir, "logo.png"))
    logo.save(os.path.join(public_dir, "app-icon.png"))
    logo.save(os.path.join(brain_dir, "chicken-ghost-logo.png"))
    print("[SUCCESS] Chicken Ghost Official Logo generated successfully!")
