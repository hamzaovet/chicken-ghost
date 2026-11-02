# -*- coding: utf-8 -*-
import os

files_to_fix = [
    r'd:\Work\chicken-ghost\package.json',
    r'd:\Work\chicken-ghost\app\page.tsx',
    r'd:\Work\chicken-ghost\app\card\page.tsx',
    r'd:\Work\chicken-ghost\app\login\page.tsx',
    r'd:\Work\chicken-ghost\components\ErpLayout.tsx',
    r'd:\Work\chicken-ghost\lib\email.ts',
]

for p in files_to_fix:
    if os.path.exists(p):
        with open(p, 'r', encoding='utf-8') as f:
            c = f.read()
        c = c.replace('فسيخ ورنجة الفراعنة (El-Fra3na)', 'تشيكن جوست (Chicken Ghost)')
        c = c.replace('فسيخ ورنجة الفراعنة', 'تشيكن جوست - Chicken Ghost')
        c = c.replace('الفراعنة', 'تشيكن جوست')
        c = c.replace('elfra3na-official-card.png', 'chicken-ghost-official-card.png')
        c = c.replace('elfra3na.vercel.app', 'chicken-ghost.vercel.app')
        c = c.replace('elfra3na', 'chicken-ghost')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f"Patched: {p}")
