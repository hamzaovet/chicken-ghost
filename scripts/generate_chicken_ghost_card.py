# -*- coding: utf-8 -*-
"""
Generate the Official Luxury Promotional Card for Chicken Ghost (تشيكن جوست)
Theme: Midnight Phantom Obsidian (#0b0914) + Neon Ghost Cyan (#00f2fe) + Spicy Crispy Orange (#ff6b00)
Dual QR Codes:
  1. Web Storefront: https://chicken-ghost.vercel.app
  2. Android App (APK): https://chicken-ghost.vercel.app/download
100% Arabic typography safety via arabic_reshaper & python-bidi.
"""
import os
import math
import qrcode
import arabic_reshaper
from bidi.algorithm import get_display
from PIL import Image, ImageDraw, ImageFont

def ar(text):
    if not text:
        return ""
    clean = (text.replace("👻", "")
                 .replace("🍗", "")
                 .replace("🍔", "")
                 .replace("🍟", "")
                 .replace("🔥", "")
                 .replace("👑", "")
                 .replace("⚡", "")
                 .replace("🛵", "")
                 .replace("📱", "")
                 .replace("📍", "")
                 .replace("📞", "")
                 .replace("🐬", "")
                 .strip())
    reshaped = arabic_reshaper.reshape(clean)
    return get_display(reshaped)

def draw_pin_icon(draw, cx, cy, color):
    draw.ellipse([(cx - 9, cy - 13), (cx + 9, cy + 5)], fill=color)
    draw.polygon([(cx - 8, cy - 1), (cx + 8, cy - 1), (cx, cy + 13)], fill=color)
    draw.ellipse([(cx - 4, cy - 7), (cx + 4, cy + 1)], fill=(11, 9, 20))

def draw_clock_icon(draw, cx, cy, color):
    draw.ellipse([(cx - 11, cy - 11), (cx + 11, cy + 11)], outline=color, width=3)
    draw.line([(cx, cy - 6), (cx, cy), (cx + 5, cy)], fill=color, width=3)

def draw_truck_icon(draw, cx, cy, color):
    draw.rounded_rectangle([(cx - 15, cy - 8), (cx + 3, cy + 6)], radius=2, fill=color)
    draw.rounded_rectangle([(cx + 3, cy - 3), (cx + 13, cy + 6)], radius=2, fill=color)
    draw.ellipse([(cx - 10, cy + 5), (cx - 3, cy + 12)], fill=(255, 107, 0))
    draw.ellipse([(cx + 5, cy + 5), (cx + 12, cy + 12)], fill=(255, 107, 0))

def draw_phone_icon(draw, cx, cy, color):
    draw.rounded_rectangle([(cx - 7, cy - 13), (cx + 7, cy + 13)], radius=3, outline=color, width=3)
    draw.ellipse([(cx - 2, cy + 6), (cx + 2, cy + 10)], fill=color)
    draw.line([(cx - 3, cy - 9), (cx + 3, cy - 9)], fill=color, width=2)

def generate_chicken_ghost_card():
    W, H = 1200, 1750
    
    # Palette
    BG_DARK      = (11, 9, 20)        # #0b0914 - Midnight Obsidian
    PANEL_BG     = (19, 15, 36)       # #130f24 - Deep Phantom Slate
    CARD_INNER   = (15, 12, 28)       # #0f0c1c
    ORANGE_SPICY = (255, 107, 0)      # #ff6b00 - Ghost Spicy Orange
    CYAN_NEON    = (0, 242, 254)      # #00f2fe - Neon Ghost Cyan
    GOLD_CRISPY  = (255, 174, 0)      # #ffae00 - Golden Crispy
    EMERALD      = (16, 185, 129)     # #10b981 - Verification Mint
    WHITE        = (255, 255, 255)
    OFF_WHITE    = (241, 245, 249)
    MUTED        = (148, 163, 184)
    BORDER_GLOW  = (255, 107, 0)
    
    card = Image.new("RGB", (W, H), color=BG_DARK)
    draw = ImageDraw.Draw(card)
    
    # Fonts
    font_dir = "C:/Windows/Fonts"
    f_en_top     = ImageFont.truetype(os.path.join(font_dir, "georgiab.ttf"), 25)
    f_title_big  = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 54)
    f_title_sub  = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 26)
    f_ribbon     = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 21)
    f_panel_hdr  = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 28)
    f_panel_sub  = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 22)
    f_panel_dsc  = ImageFont.truetype(os.path.join(font_dir, "tahoma.ttf"), 17)
    f_url_pill   = ImageFont.truetype(os.path.join(font_dir, "georgiab.ttf"), 19)
    f_badge_pill = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 17)
    f_feat_txt   = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 21)
    f_box_hdr    = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 26)
    f_body_bold  = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 21)
    f_body       = ImageFont.truetype(os.path.join(font_dir, "tahoma.ttf"), 18)
    f_dev_txt    = ImageFont.truetype(os.path.join(font_dir, "tahomabd.ttf"), 20)
    f_small      = ImageFont.truetype(os.path.join(font_dir, "tahoma.ttf"), 15)
    
    # 1. Double Luxury Borders
    draw.rounded_rectangle([(16, 16), (W - 16, H - 16)], radius=28, outline=ORANGE_SPICY, width=4)
    draw.rounded_rectangle([(26, 26), (W - 26, H - 26)], radius=22, outline=CYAN_NEON, width=2)
    draw.rounded_rectangle([(34, 34), (W - 34, H - 34)], radius=18, outline=PANEL_BG, width=1)
    
    # 2. Top Header Banner
    header_top = 44
    header_h   = 350
    draw.rounded_rectangle([(44, header_top), (W - 44, header_top + header_h)], radius=24, fill=PANEL_BG, outline=ORANGE_SPICY, width=2)
    
    # Accent top neon line
    draw.rounded_rectangle([(44, header_top), (W - 44, header_top + 10)], radius=8, fill=ORANGE_SPICY)
    
    # Center Circular Emblem Logo
    logo_path = r"d:\Work\chicken-ghost\public\logo.png"
    logo_size = 144
    logo_cx = W // 2
    logo_cy = header_top + 84
    if os.path.exists(logo_path):
        logo_im = Image.open(logo_path).convert("RGBA").resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        draw.ellipse([logo_cx - logo_size//2 - 6, logo_cy - logo_size//2 - 6,
                      logo_cx + logo_size//2 + 6, logo_cy + logo_size//2 + 6],
                     fill=BG_DARK, outline=CYAN_NEON, width=4)
        card.paste(logo_im, (logo_cx - logo_size//2, logo_cy - logo_size//2), logo_im)
        
    # English Header
    y_hdr = header_top + 172
    draw.text((W // 2, y_hdr), "CHICKEN GHOST • CRISPY FRIED CHICKEN & BURGERS", font=f_en_top, fill=CYAN_NEON, anchor="mm")
    
    # Pure Arabic Main Title
    y_hdr += 52
    title_ar = ar("مطعم تشيكن جوست — شبح الفرايد تشيكن")
    draw.text((W // 2, y_hdr), title_ar, font=f_title_big, fill=WHITE, anchor="mm")
    
    # Subtitle
    y_hdr += 48
    sub_ar = ar("أقوى قرمشة في مصر • بوكسات الشبح وسندوتشات محشوة جبنة سايحة")
    draw.text((W // 2, y_hdr), sub_ar, font=f_title_sub, fill=GOLD_CRISPY, anchor="mm")
    
    # 3. Spicy Feature Ribbon
    ribbon_y1 = header_top + header_h + 18
    ribbon_h  = 54
    draw.rounded_rectangle([(44, ribbon_y1), (W - 44, ribbon_y1 + ribbon_h)], radius=18, fill=ORANGE_SPICY)
    ribbon_txt = ar("منظومة سحابية متكاملة: منيو دليفري • كاشير POS • شات مباشر وتتبع لحظي")
    draw.text((W // 2, ribbon_y1 + ribbon_h // 2), ribbon_txt, font=f_ribbon, fill=WHITE, anchor="mm")
    
    # 4. Generate High-Res QR Codes
    # Web QR
    web_url = "https://chicken-ghost.vercel.app"
    qr_web_gen = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=10, border=1)
    qr_web_gen.add_data(web_url)
    qr_web_gen.make(fit=True)
    img_qr_web = qr_web_gen.make_image(fill_color="#0b0914", back_color="white").convert("RGB")
    
    # APK QR
    apk_url = "https://chicken-ghost.vercel.app/download"
    qr_apk_gen = qrcode.QRCode(version=1, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=10, border=1)
    qr_apk_gen.add_data(apk_url)
    qr_apk_gen.make(fit=True)
    img_qr_apk = qr_apk_gen.make_image(fill_color="#0b0914", back_color="white").convert("RGB")
    
    # 5. Dual QR Cards Section
    cards_y = ribbon_y1 + ribbon_h + 24
    card_w  = 532
    card_h  = 625
    
    col_right_x = W - 44 - card_w   # 624 (Android App)
    col_left_x  = 44                # 44 (Web Storefront)
    qr_box_size = 280
    
    # === RIGHT BOX: Official Android App ===
    draw.rounded_rectangle([(col_right_x, cards_y), (col_right_x + card_w, cards_y + card_h)],
                           radius=22, fill=CARD_INNER, outline=ORANGE_SPICY, width=3)
    
    # Header Bar
    draw.rounded_rectangle([(col_right_x, cards_y), (col_right_x + card_w, cards_y + 70)],
                           radius=20, fill=PANEL_BG)
    draw.rounded_rectangle([(col_right_x, cards_y + 56), (col_right_x + card_w, cards_y + 70)],
                           radius=0, fill=PANEL_BG)
    draw.line([(col_right_x, cards_y + 70), (col_right_x + card_w, cards_y + 70)], fill=ORANGE_SPICY, width=2)
    
    head_apk = ar("تطبيق الأندرويد الرسمي (APK)")
    draw.text((col_right_x + card_w // 2, cards_y + 35), head_apk, font=f_panel_hdr, fill=GOLD_CRISPY, anchor="mm")
    
    # QR Container
    qr_rx = col_right_x + (card_w - qr_box_size) // 2
    qr_ry = cards_y + 90
    draw.rounded_rectangle([(qr_rx - 10, qr_ry - 10), (qr_rx + qr_box_size + 10, qr_ry + qr_box_size + 10)],
                           radius=16, fill=WHITE, outline=CYAN_NEON, width=3)
    img_qr_apk_resized = img_qr_apk.resize((qr_box_size, qr_box_size), Image.Resampling.LANCZOS)
    card.paste(img_qr_apk_resized, (qr_rx, qr_ry))
    
    # Action text under QR
    t_apk_y = qr_ry + qr_box_size + 24
    draw.text((col_right_x + card_w // 2, t_apk_y), ar("امسح الكود لتحميل وتثبيت التطبيق مباشرة"), font=f_panel_sub, fill=WHITE, anchor="mm")
    draw.text((col_right_x + card_w // 2, t_apk_y + 28), ar("تطبيق خفيف وسريع لكافة هواتف الأندرويد"), font=f_panel_dsc, fill=MUTED, anchor="mm")
    draw.text((col_right_x + card_w // 2, t_apk_y + 50), ar("إشعارات فورية وتتبع خطوة بخطوة للطلب"), font=f_panel_dsc, fill=MUTED, anchor="mm")
    
    # URL Pill
    pill_w = 420
    pill_h = 42
    pill_rx = col_right_x + (card_w - pill_w) // 2
    pill_ry = cards_y + card_h - 105
    draw.rounded_rectangle([(pill_rx, pill_ry), (pill_rx + pill_w, pill_ry + pill_h)],
                           radius=21, fill=BG_DARK, outline=ORANGE_SPICY, width=2)
    draw.text((col_right_x + card_w // 2, pill_ry + pill_h // 2), "chicken-ghost.vercel.app/download", font=f_url_pill, fill=CYAN_NEON, anchor="mm")
    
    # Green Verification Badge
    badge_apk = ar("إصدار رسمي معتمد v1.0.0 • تحميل مجاني")
    draw.text((col_right_x + card_w // 2, pill_ry + pill_h + 24), badge_apk, font=f_badge_pill, fill=EMERALD, anchor="mm")
    
    
    # === LEFT BOX: Web Storefront ===
    draw.rounded_rectangle([(col_left_x, cards_y), (col_left_x + card_w, cards_y + card_h)],
                           radius=22, fill=CARD_INNER, outline=CYAN_NEON, width=3)
    
    # Header Bar
    draw.rounded_rectangle([(col_left_x, cards_y), (col_left_x + card_w, cards_y + 70)],
                           radius=20, fill=PANEL_BG)
    draw.rounded_rectangle([(col_left_x, cards_y + 56), (col_left_x + card_w, cards_y + 70)],
                           radius=0, fill=PANEL_BG)
    draw.line([(col_left_x, cards_y + 70), (col_left_x + card_w, cards_y + 70)], fill=CYAN_NEON, width=2)
    
    head_web = ar("المتجر الإلكتروني المباشر (Web)")
    draw.text((col_left_x + card_w // 2, cards_y + 35), head_web, font=f_panel_hdr, fill=CYAN_NEON, anchor="mm")
    
    # QR Container
    qr_lx = col_left_x + (card_w - qr_box_size) // 2
    draw.rounded_rectangle([(qr_lx - 10, qr_ry - 10), (qr_lx + qr_box_size + 10, qr_ry + qr_box_size + 10)],
                           radius=16, fill=WHITE, outline=ORANGE_SPICY, width=3)
    img_qr_web_resized = img_qr_web.resize((qr_box_size, qr_box_size), Image.Resampling.LANCZOS)
    card.paste(img_qr_web_resized, (qr_lx, qr_ry))
    
    # Action text under QR
    draw.text((col_left_x + card_w // 2, t_apk_y), ar("امسح الكود للطلب أونلاين فوراً بدون تحميل"), font=f_panel_sub, fill=WHITE, anchor="mm")
    draw.text((col_left_x + card_w // 2, t_apk_y + 28), ar("يعمل على جميع الأجهزة (آيفون، أندرويد، كمبيوتر)"), font=f_panel_dsc, fill=MUTED, anchor="mm")
    draw.text((col_left_x + card_w // 2, t_apk_y + 50), ar("منيو صور تفاعلي واختيار بوكسات وسندوتشات"), font=f_panel_dsc, fill=MUTED, anchor="mm")
    
    # URL Pill
    pill_lx = col_left_x + (card_w - pill_w) // 2
    draw.rounded_rectangle([(pill_lx, pill_ry), (pill_lx + pill_w, pill_ry + pill_h)],
                           radius=21, fill=BG_DARK, outline=CYAN_NEON, width=2)
    draw.text((col_left_x + card_w // 2, pill_ry + pill_h // 2), "chicken-ghost.vercel.app", font=f_url_pill, fill=GOLD_CRISPY, anchor="mm")
    
    # Green Verification Badge
    badge_web = ar("طلب فوري • دفع عند الاستلام • إنستاباي")
    draw.text((col_left_x + card_w // 2, pill_ry + pill_h + 24), badge_web, font=f_badge_pill, fill=EMERALD, anchor="mm")
    
    
    # 6. Three Generous Features Strip (Zero overlap)
    feat_y = cards_y + card_h + 20
    feat_h = 62
    draw.rounded_rectangle([(44, feat_y), (W - 44, feat_y + feat_h)], radius=18, fill=PANEL_BG, outline=ORANGE_SPICY, width=2)
    
    features = [
        "توصيل سريع لحدائق القبة",
        "قرمشة كرانشي طازجة 100%",
        "دفع نقدياً • فيزا • إنستاباي"
    ]
    fw = (W - 88) // 3
    for i, feat in enumerate(features):
        ft_txt = ar(feat)
        fx = 44 + (2 - i) * fw + fw // 2
        draw.text((fx, feat_y + feat_h // 2), ft_txt, font=f_feat_txt, fill=CYAN_NEON, anchor="mm")
        if i < 2:
            sep_x = 44 + (2 - i) * fw
            draw.ellipse([(sep_x - 3, feat_y + feat_h // 2 - 3), (sep_x + 3, feat_y + feat_h // 2 + 3)], fill=ORANGE_SPICY)
            
    # 7. Branch & Coverage Information Box
    info_y1 = feat_y + feat_h + 20
    info_h  = 320
    draw.rounded_rectangle([(44, info_y1), (W - 44, info_y1 + info_h)], radius=22, fill=CARD_INNER, outline=BORDER_GLOW, width=2)
    
    # Header
    draw.rounded_rectangle([(44, info_y1), (W - 44, info_y1 + 52)], radius=20, fill=PANEL_BG)
    draw.rounded_rectangle([(44, info_y1 + 38), (W - 44, info_y1 + 52)], radius=0, fill=PANEL_BG)
    info_hdr_txt = ar("فروع تشيكن جوست ونطاق التغطية بالقاهرة")
    draw.text((W // 2, info_y1 + 26), info_hdr_txt, font=f_box_hdr, fill=GOLD_CRISPY, anchor="mm")
    
    # 4 Rows
    row_y = info_y1 + 65
    info_items = [
        (draw_pin_icon, "عناوين الفروع:", "الفرع الرئيسي: 74 شارع الدويدار (حدائق القبة) • الوايلي والعباسية • الزيتون • مدينة نصر", GOLD_CRISPY),
        (draw_phone_icon, "الخط الساخن:", "01010568615  •  01010568616  (اتصال وواتساب لجميع الطلبات على مدار اليوم)", WHITE),
        (draw_truck_icon, "الشحن والتوصيل:", "أسطول دليفري طيارين مجهز بحوافظ حرارية ساخنة لحفظ القرمشة حتى باب بيتك", OFF_WHITE),
        (draw_clock_icon, "مواعيد العمل:", "يومياً من الساعة 11:00 صباحاً حتى الساعة 3:00 بعد منتصف الليل طوال أيام الأسبوع", OFF_WHITE)
    ]
    
    for icon_fn, label, val, val_clr in info_items:
        draw.rounded_rectangle([(60, row_y), (W - 60, row_y + 52)], radius=14, fill=PANEL_BG)
        icon_fn(draw, W - 92, row_y + 26, CYAN_NEON)
        
        lbl_txt = ar(label)
        draw.text((W - 120, row_y + 26), lbl_txt, font=f_body_bold, fill=ORANGE_SPICY, anchor="rm")
        
        val_txt = ar(val)
        draw.text((80, row_y + 26), val_txt, font=f_body, fill=val_clr, anchor="lm")
        
        row_y += 60
        
    # 8. Mandatory Footer Attribution
    foot_y = info_y1 + info_h + 24
    
    draw.line([(W // 2 - 320, foot_y), (W // 2 + 320, foot_y)], fill=ORANGE_SPICY, width=1)
    draw.ellipse([(W // 2 - 4, foot_y - 4), (W // 2 + 4, foot_y + 4)], fill=CYAN_NEON)
    
    dev_txt = ar("تم تطوير وبرمجة النظام بواسطة شركة أوركا للحلول البرمجية والخدمات السحابية")
    draw.text((W // 2, foot_y + 22), dev_txt, font=f_dev_txt, fill=GOLD_CRISPY, anchor="mm")
    
    eng_credit = "Orca Cloud & Enterprise Software Solutions • https://chicken-ghost.vercel.app"
    draw.text((W // 2, foot_y + 48), eng_credit, font=f_small, fill=MUTED, anchor="mm")
    
    # Save outputs
    public_out = r"d:\Work\chicken-ghost\public\chicken-ghost-official-card.png"
    brain_out  = r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d\chicken-ghost-official-card.png"
    
    card.save(public_out, quality=98)
    card.save(brain_out, quality=98)
    
    # Standalone QR outputs
    qr_web_out = r"d:\Work\chicken-ghost\public\chicken-ghost-web-qr.png"
    qr_apk_out = r"d:\Work\chicken-ghost\public\chicken-ghost-apk-qr.png"
    img_qr_web.save(qr_web_out)
    img_qr_apk.save(qr_apk_out)
    img_qr_web.save(r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d\chicken-ghost-web-qr.png")
    img_qr_apk.save(r"C:\Users\Dr Princa\.gemini\antigravity\brain\2d9d53fe-6b03-4ac8-8878-725378cea44d\chicken-ghost-apk-qr.png")
    
    print(f"[SUCCESS] Chicken Ghost Official Luxury Card regenerated successfully at:")
    print(f"  -> {public_out}")
    print(f"  -> {brain_out}")

if __name__ == "__main__":
    generate_chicken_ghost_card()
