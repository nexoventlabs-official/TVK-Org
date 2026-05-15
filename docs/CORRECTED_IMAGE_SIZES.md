# Corrected Image Sizes - Based on Actual Website Analysis

**Date:** May 15, 2026  
**Status:** ✅ VERIFIED FROM ACTUAL CODE

---

## Methodology

1. ✅ Analyzed actual component code (Hero.tsx, Gallery.tsx, News.tsx)
2. ✅ Measured CSS dimensions
3. ✅ Calculated for common screen sizes (1920px, 1440px, 1366px)
4. ✅ Applied 2x multiplier for retina displays
5. ✅ Rounded to practical dimensions

---

## Assumptions

- **Desktop width:** 1920px (most common)
- **Padding:** 64px on each side (128px total)
- **Container width:** 1920 - 128 = **1792px**
- **Retina multiplier:** 2x for sharp images
- **Object-fit:** cover (crops to fit)

---

## 1. Hero Portrait

### Actual CSS:
```css
.hero-grid {
  grid-template-columns: 52% 48%;
  min-height: 100vh;
}
.hero-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Calculations:

**Desktop (1920×1080):**
- Width: 1920 × 52% = 998px
- Height: 1080px (100vh)
- Aspect: 0.92:1

**2x for Retina:**
- 998 × 2 = 1996px
- 1080 × 2 = 2160px

### ✅ CORRECTED RECOMMENDATION:
**2000×2160px** (0.93:1 ratio - almost square, slightly taller)

**Alternative (smaller file):** 1600×1800px

---

## 2. News Images

### Actual CSS:
```css
.news-grid {
  grid-template-columns: 2fr 1fr 1fr;
  gap: 18px;
}
```

### Calculations:

**Container:** 1792px  
**Total fractions:** 2 + 1 + 1 = 4fr  
**Gaps:** 2 × 18px = 36px  
**Available:** 1792 - 36 = 1756px

**Featured (2fr):**
- Width: (1756 / 4) × 2 = 878px
- Height: 210px
- Aspect: 4.18:1

**Secondary (1fr each):**
- Width: (1756 / 4) × 1 = 439px
- Height: 150px
- Aspect: 2.93:1

**2x for Retina:**
- Featured: 1756 × 420px
- Secondary: 878 × 300px

### ✅ CORRECTED RECOMMENDATIONS:

#### news_featured:
**1800×420px** (4.3:1 ratio - wide landscape)

#### news_secondary_1 & news_secondary_2:
**900×300px** (3:1 ratio - landscape)

---

## 3. Gallery Images (Homepage)

### Actual CSS:

**Row 1:**
```css
grid-template-columns: 2fr 1fr 1fr;
height: 220px;
gap: 4px;
```

**Row 2:**
```css
grid-template-columns: repeat(4, 1fr);
height: 130px;
gap: 4px;
```

### Calculations:

**Container:** 1792px

**Row 1:**
- Total fractions: 4fr
- Gaps: 2 × 4px = 8px
- Available: 1792 - 8 = 1784px
- Cell 1 (2fr): (1784 / 4) × 2 = 892px × 220px
- Cell 2-3 (1fr): (1784 / 4) × 1 = 446px × 220px

**Row 2:**
- Total fractions: 4fr
- Gaps: 3 × 4px = 12px
- Available: 1792 - 12 = 1780px
- Each cell: 1780 / 4 = 445px × 130px

**2x for Retina:**
- gallery_1: 1784 × 440px
- gallery_2-3: 892 × 440px
- gallery_4-7: 890 × 260px

### ✅ CORRECTED RECOMMENDATIONS:

#### gallery_1 (Wide):
**1800×450px** (4:1 ratio - ultra-wide)

#### gallery_2 & gallery_3:
**900×450px** (2:1 ratio - landscape)

#### gallery_4, gallery_5, gallery_6, gallery_7:
**900×260px** (3.5:1 ratio - wide landscape)

---

## 4. Gallery Page Images

### Actual CSS:
```css
grid-template-columns: repeat(4, 1fr);
gap: 4px;
height: 200px;
```

### Calculations:

**Container:** 1792px  
**Gaps:** 3 × 4px = 12px  
**Available:** 1792 - 12 = 1780px  
**Each cell:** 1780 / 4 = 445px × 200px

**2x for Retina:** 890 × 400px

### ✅ CORRECTED RECOMMENDATIONS:

#### gallery_extra_1, gallery_extra_2, gallery_extra_3, gallery_extra_4, gallery_extra_5:
**900×400px** (2.25:1 ratio - landscape)

---

## Summary Table - CORRECTED

| Slot | Old (WRONG) | New (CORRECT) | Aspect Ratio |
|------|-------------|---------------|--------------|
| **hero_portrait** | 800×1067px (3:4) | **2000×2160px** | 0.93:1 (almost square) |
| **news_featured** | 1600×1000px (16:10) | **1800×420px** | 4.3:1 (ultra-wide) |
| **news_secondary_1** | 1600×1000px (16:10) | **900×300px** | 3:1 (wide) |
| **news_secondary_2** | 1600×1000px (16:10) | **900×300px** | 3:1 (wide) |
| **gallery_1** | 2100×900px (21:9) | **1800×450px** | 4:1 (ultra-wide) |
| **gallery_2** | 1200×1200px (1:1) | **900×450px** | 2:1 (landscape) |
| **gallery_3** | 1200×1200px (1:1) | **900×450px** | 2:1 (landscape) |
| **gallery_4** | 1200×1200px (1:1) | **900×260px** | 3.5:1 (wide) |
| **gallery_5** | 1200×1200px (1:1) | **900×260px** | 3.5:1 (wide) |
| **gallery_6** | 1200×1200px (1:1) | **900×260px** | 3.5:1 (wide) |
| **gallery_7** | 1200×1200px (1:1) | **900×260px** | 3.5:1 (wide) |
| **gallery_extra_1** | 1200×1200px (1:1) | **900×400px** | 2.25:1 (landscape) |
| **gallery_extra_2** | 1200×1200px (1:1) | **900×400px** | 2.25:1 (landscape) |
| **gallery_extra_3** | 1200×1200px (1:1) | **900×400px** | 2.25:1 (landscape) |
| **gallery_extra_4** | 1200×1200px (1:1) | **900×400px** | 2.25:1 (landscape) |
| **gallery_extra_5** | 1200×1200px (1:1) | **900×400px** | 2.25:1 (landscape) |

---

## Key Differences

### What Was Wrong:

1. ❌ **Hero:** Assumed 3:4 portrait ratio
   - **Reality:** Almost square (0.93:1), much wider than assumed

2. ❌ **News:** Assumed 16:10 landscape
   - **Reality:** Much wider (3:1 to 4.3:1), like banner images

3. ❌ **Gallery:** Assumed square (1:1) for most
   - **Reality:** All landscape (2:1 to 4:1), no squares at all!

### Why It Matters:

- **Wrong aspect ratio** = Images get cropped incorrectly
- **Wrong dimensions** = Blurry or unnecessarily large files
- **User uploads wrong size** = Poor display quality

---

## Verification

To verify these calculations, I:

1. ✅ Read Hero.tsx - found `grid-template-columns: 52% 48%` and `min-height: 100vh`
2. ✅ Read Gallery.tsx - found `gridTemplateColumns: "2fr 1fr 1fr"` and `height: 220px`
3. ✅ Read News.tsx - found `gridTemplateColumns: "2fr 1fr 1fr"` and heights 210px/150px
4. ✅ Calculated based on 1920px screen width
5. ✅ Applied 2x multiplier for retina
6. ✅ Rounded to practical numbers

---

## Next Steps

1. ⏳ Update `backend/config/imageSlots.js` with correct sizes
2. ⏳ Restart backend server
3. ⏳ Verify admin panel shows correct sizes
4. ⏳ Update all documentation
5. ⏳ Test with actual images

---

**Status:** Calculations complete, ready to update config  
**Verified:** Based on actual component code analysis
