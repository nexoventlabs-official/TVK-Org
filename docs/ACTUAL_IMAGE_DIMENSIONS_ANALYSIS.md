# Actual Image Dimensions Analysis

**Date:** May 15, 2026  
**Status:** ⚠️ CORRECTION NEEDED

---

## Problem Identified

The recommended image sizes were provided **without analyzing the actual website layout**. The dimensions need to be calculated based on:

1. Actual CSS dimensions
2. Common screen resolutions
3. Responsive breakpoints
4. Object-fit behavior

---

## Hero Section - ACTUAL Analysis

### Layout:
```css
.hero-grid {
  grid-template-columns: 52% 48%;
  min-height: 100vh;
}

.hero-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
```

### Responsive Breakpoints:
- **Desktop (>1024px):** 52% width, 100vh height
- **Tablet (768-1024px):** 100% width, 50vh height
- **Mobile (<768px):** 100% width, 45vh height

### Actual Pixel Calculations:

#### Common Desktop Resolutions:

| Screen Size | Hero Width | Hero Height | Recommended Image |
|-------------|------------|-------------|-------------------|
| 1920×1080 | 998px | 1080px | **1000×1080px** (0.93:1) |
| 1680×1050 | 874px | 1050px | **900×1050px** (0.86:1) |
| 1440×900 | 749px | 900px | **750×900px** (0.83:1) |
| 1366×768 | 710px | 768px | **710×768px** (0.92:1) |

**Actual Aspect Ratio:** ~0.85:1 to 0.95:1 (NOT 3:4!)

#### Tablet:

| Screen Size | Hero Width | Hero Height | Recommended Image |
|-------------|------------|-------------|-------------------|
| 1024×768 | 1024px | 384px | **1024×384px** (2.67:1) |
| 768×1024 | 768px | 512px | **768×512px** (1.5:1) |

#### Mobile:

| Screen Size | Hero Width | Hero Height | Recommended Image |
|-------------|------------|-------------|-------------------|
| 414×896 | 414px | 403px | **414×403px** (1.03:1) |
| 390×844 | 390px | 380px | **390×380px** (1.03:1) |
| 375×667 | 375px | 300px | **375×300px** (1.25:1) |

### ⚠️ PROBLEM:
The recommended size of **800×1067px (3:4 ratio)** is **INCORRECT**!

The actual aspect ratio varies by screen size:
- Desktop: ~0.9:1 (almost square, slightly taller)
- Tablet: 1.5:1 to 2.67:1 (landscape)
- Mobile: ~1:1 (square)

---

## Gallery Section - ACTUAL Analysis

### Homepage Gallery Layout:

#### Row 1:
```css
grid-template-columns: 2fr 1fr 1fr;
height: 220px;
gap: 4px;
```

**Assuming 1920px screen width with 64px padding on each side:**
- Container width: 1920 - 128 = 1792px
- Total fractions: 2 + 1 + 1 = 4fr
- Cell 1 (gallery_1): (1792 / 4) × 2 = **896px wide × 220px tall** = 4.07:1 ratio
- Cell 2 (gallery_2): (1792 / 4) × 1 = **448px wide × 220px tall** = 2.04:1 ratio
- Cell 3 (gallery_3): (1792 / 4) × 1 = **448px wide × 220px tall** = 2.04:1 ratio

#### Row 2:
```css
grid-template-columns: repeat(4, 1fr);
height: 130px;
gap: 4px;
```

- Each cell: 1792 / 4 = **448px wide × 130px tall** = 3.45:1 ratio

### ⚠️ PROBLEM:
The recommended sizes are **COMPLETELY WRONG**!

| Slot | Recommended (WRONG) | Actual Needed | Correct Ratio |
|------|---------------------|---------------|---------------|
| gallery_1 | 2100×900px (21:9) | **896×220px** | 4:1 |
| gallery_2-3 | 1200×1200px (1:1) | **448×220px** | 2:1 |
| gallery_4-7 | 1200×1200px (1:1) | **448×130px** | 3.5:1 |

---

## Gallery Page - ACTUAL Analysis

### Layout:
```css
grid-template-columns: repeat(4, 1fr);
gap: 4px;
height: 200px;
```

**Assuming 1920px screen with 64px padding:**
- Container: 1792px
- Each cell: 1792 / 4 = **448px wide × 200px tall** = 2.24:1 ratio

### ⚠️ PROBLEM:
Recommended **1200×1200px (1:1)** is **WRONG**!
Actual needed: **448×200px (2.24:1 ratio)**

---

## Correct Recommendations

### Methodology:

For responsive images with `object-fit: cover`, we should recommend:
1. **2x the largest display size** (for retina displays)
2. **Maintain the actual aspect ratio** of the container
3. **Account for responsive breakpoints**

### Hero Portrait - CORRECTED:

**Recommended Size:** **2000×2160px** (0.93:1 ratio)

**Reasoning:**
- Desktop 1920px: 998px × 1080px → 2x = 1996×2160px
- Rounds to 2000×2160px
- Aspect ratio: 0.93:1 (almost square, slightly taller)
- Works for all breakpoints with object-fit: cover

**Alternative:** **1600×1800px** (0.89:1) for smaller file size

### Gallery Images - CORRECTED:

#### Gallery 1 (Wide):
**Recommended Size:** **1800×450px** (4:1 ratio)

**Reasoning:**
- Desktop: 896px × 220px → 2x = 1792×440px
- Rounds to 1800×450px

#### Gallery 2-3 (Top Row):
**Recommended Size:** **900×450px** (2:1 ratio)

**Reasoning:**
- Desktop: 448px × 220px → 2x = 896×440px
- Rounds to 900×450px

#### Gallery 4-7 (Bottom Row):
**Recommended Size:** **900×260px** (3.5:1 ratio)

**Reasoning:**
- Desktop: 448px × 130px → 2x = 896×260px
- Rounds to 900×260px

#### Gallery Extra 1-5 (Gallery Page):
**Recommended Size:** **900×400px** (2.25:1 ratio)

**Reasoning:**
- Desktop: 448px × 200px → 2x = 896×400px
- Rounds to 900×400px

### News Images - NEED TO CHECK:

Let me check the News component...

---

## Action Required

1. ✅ Analyze actual CSS dimensions
2. ⏳ Calculate correct pixel sizes
3. ⏳ Update backend config with correct sizes
4. ⏳ Update admin panel display
5. ⏳ Update documentation

---

## Lesson Learned

**Never assume dimensions without checking:**
1. ✅ Read the actual component code
2. ✅ Check CSS dimensions
3. ✅ Calculate based on common screen sizes
4. ✅ Account for responsive breakpoints
5. ✅ Consider retina displays (2x)
6. ✅ Test with actual images

---

**Status:** Analysis in progress...  
**Next:** Check News component and update all recommendations
