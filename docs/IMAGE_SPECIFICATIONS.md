# Image Specifications Guide

**Last Updated:** May 15, 2026

This document provides recommended image dimensions for all image slots on the P. Venkataramanan official website.

---

## Quick Reference Table

| Slot | Location | Aspect Ratio | Recommended Size | Format |
|------|----------|--------------|------------------|--------|
| **Hero Portrait** | Homepage hero section | 3:4 (Portrait) | 800×1067px | JPG/PNG |
| **News Featured** | Homepage news section | 16:10 (Landscape) | 1600×1000px | JPG/PNG |
| **News Card 2** | Homepage news section | 16:10 (Landscape) | 1600×1000px | JPG/PNG |
| **News Card 3** | Homepage news section | 16:10 (Landscape) | 1600×1000px | JPG/PNG |
| **Gallery 1-7** | Homepage gallery | 1:1 (Square) or 21:9 (Wide) | 1200×1200px or 2100×900px | JPG/PNG |
| **Gallery Extra 1-5** | Gallery page | 1:1 (Square) | 1200×1200px | JPG/PNG |

---

## Detailed Specifications

### 1. Hero Section

#### Hero Portrait
- **Slot ID:** `hero_portrait`
- **Location:** Homepage left panel (main hero image)
- **Aspect Ratio:** 3:4 (Portrait)
- **Recommended Size:** 800×1067px
- **Minimum Size:** 600×800px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Primary portrait of P. Venkataramanan displayed prominently on homepage

**Tips:**
- Use high-quality portrait with good lighting
- Face should be clearly visible
- Professional attire recommended
- Vertical composition works best

---

### 2. News Section

#### News Featured (Large Card)
- **Slot ID:** `news_featured`
- **Location:** Homepage news section (left large card)
- **Aspect Ratio:** 16:10 (Landscape)
- **Recommended Size:** 1600×1000px
- **Minimum Size:** 1200×750px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Cover image for featured news article

#### News Secondary Cards (Card 2 & 3)
- **Slot IDs:** `news_secondary_1`, `news_secondary_2`
- **Location:** Homepage news section (right side cards)
- **Aspect Ratio:** 16:10 (Landscape)
- **Recommended Size:** 1600×1000px
- **Minimum Size:** 1200×750px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Cover images for secondary news articles

**Tips:**
- Use action shots or event photos
- Ensure good contrast for text overlay
- Horizontal composition works best
- Avoid cluttered backgrounds

---

### 3. Gallery Section (Homepage)

#### Gallery 1 - TVK Event (Wide)
- **Slot ID:** `gallery_1`
- **Location:** Homepage gallery section (top-row, spans 2 cells)
- **Aspect Ratio:** 21:9 (Wide)
- **Recommended Size:** 2100×900px
- **Minimum Size:** 1680×720px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Wide panoramic shot of TVK events

**Tips:**
- Use wide-angle shots
- Group photos work well
- Event banners and crowds
- Horizontal panoramic composition

#### Gallery 2-7 (Square)
- **Slot IDs:** `gallery_2`, `gallery_3`, `gallery_4`, `gallery_5`, `gallery_6`, `gallery_7`
- **Location:** Homepage gallery section (grid layout)
- **Aspect Ratio:** 1:1 (Square)
- **Recommended Size:** 1200×1200px
- **Minimum Size:** 800×800px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Various event photos, meetings, school visits, rallies

**Tags:**
- Gallery 2: MLA Office
- Gallery 3: School Visit
- Gallery 4: Programme
- Gallery 5: Meeting
- Gallery 6: School
- Gallery 7: Rally

**Tips:**
- Center the subject
- Square crop works best
- Good for portraits and close-ups
- Ensure subject is in center

---

### 4. Gallery Page (Dedicated Page)

#### Gallery Extra 1-5 (Square)
- **Slot IDs:** `gallery_extra_1`, `gallery_extra_2`, `gallery_extra_3`, `gallery_extra_4`, `gallery_extra_5`
- **Location:** /gallery page only (not shown on homepage)
- **Aspect Ratio:** 1:1 (Square)
- **Recommended Size:** 1200×1200px
- **Minimum Size:** 800×800px
- **Maximum File Size:** 8 MB
- **Format:** JPEG, PNG, or WebP
- **Usage:** Additional gallery photos for dedicated gallery page

**Tags:**
- Gallery Extra 1: Inauguration
- Gallery Extra 2: Cadre Meet
- Gallery Extra 3: Press Briefing
- Gallery Extra 4: Site Visit
- Gallery Extra 5: Public Meeting

**Tips:**
- Same as Gallery 2-7
- Use for additional event coverage
- Maintain consistent quality with homepage gallery

---

## Image Preparation Guidelines

### General Best Practices

1. **Resolution:**
   - Use at least the recommended size
   - Higher resolution is better (will be optimized by Cloudinary)
   - Avoid upscaling low-resolution images

2. **File Format:**
   - JPEG: Best for photographs (smaller file size)
   - PNG: Best for images with text or graphics
   - WebP: Modern format (smaller size, good quality)

3. **File Size:**
   - Maximum: 8 MB per image
   - Recommended: 1-3 MB for optimal upload speed
   - Cloudinary will automatically optimize

4. **Aspect Ratio:**
   - Always maintain the recommended aspect ratio
   - Images will be cropped to fit if aspect ratio doesn't match
   - Use image editing software to crop before upload

5. **Quality:**
   - Use high-quality source images
   - Good lighting and focus
   - Avoid blurry or pixelated images
   - Professional photography recommended

### Image Editing Tips

1. **Cropping:**
   - Use the recommended aspect ratio
   - Center the main subject
   - Leave some breathing room around edges

2. **Brightness & Contrast:**
   - Ensure good visibility
   - Avoid overly dark or bright images
   - Adjust for web display

3. **Color:**
   - Use natural colors
   - Avoid over-saturation
   - Maintain consistency across images

4. **Compression:**
   - Compress before upload (optional)
   - Cloudinary will handle optimization
   - Balance quality vs file size

---

## Aspect Ratio Reference

### Portrait (3:4)
```
┌─────────┐
│         │
│         │
│  3:4    │
│         │
│         │
│         │
└─────────┘
```
**Example Sizes:** 600×800px, 800×1067px, 1200×1600px

### Landscape (16:10)
```
┌──────────────────┐
│                  │
│      16:10       │
│                  │
└──────────────────┘
```
**Example Sizes:** 1200×750px, 1600×1000px, 1920×1200px

### Square (1:1)
```
┌──────────┐
│          │
│   1:1    │
│          │
└──────────┘
```
**Example Sizes:** 800×800px, 1200×1200px, 1600×1600px

### Wide (21:9)
```
┌────────────────────────────┐
│          21:9              │
└────────────────────────────┘
```
**Example Sizes:** 1680×720px, 2100×900px, 2520×1080px

---

## Upload Process

### Via Admin Panel

1. **Login:**
   - Go to http://localhost:5174 (or production URL)
   - Email: `admin@venkatraman.in`
   - Password: `VenkatAdmin2026!Secure`

2. **Navigate to Photos:**
   - Click "Photos" in left sidebar
   - View all available image slots

3. **Upload Image:**
   - Find the slot you want to update
   - Click "Upload" button or drag & drop
   - Select image file (JPEG/PNG/WebP, ≤8 MB)
   - Wait for upload to complete

4. **Verify:**
   - Image appears in admin panel preview
   - Check public website (may take ~30 seconds)
   - Verify image displays correctly

5. **Replace/Remove:**
   - Click "Replace" to upload new image
   - Click trash icon to remove image
   - Removed images show placeholder on website

---

## Troubleshooting

### Image Not Displaying

**Problem:** Image uploaded but not showing on website

**Solutions:**
1. Wait 30-60 seconds for cache to clear
2. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
3. Check if image uploaded successfully in admin panel
4. Verify backend is running (port 5050)
5. Check browser console for errors

### Image Looks Stretched/Cropped

**Problem:** Image doesn't fit properly in slot

**Solutions:**
1. Check aspect ratio matches recommendation
2. Re-crop image to correct aspect ratio
3. Use image editing software before upload
4. Ensure subject is centered in frame

### Upload Failed

**Problem:** Image won't upload

**Solutions:**
1. Check file size (must be ≤8 MB)
2. Verify file format (JPEG/PNG/WebP only)
3. Check internet connection
4. Try different browser
5. Check backend logs for errors

### Image Quality Poor

**Problem:** Image looks blurry or pixelated

**Solutions:**
1. Use higher resolution source image
2. Don't upscale low-resolution images
3. Use recommended dimensions or larger
4. Check original image quality
5. Avoid heavy compression before upload

---

## Image Optimization

### Cloudinary Automatic Optimization

All uploaded images are automatically optimized by Cloudinary:

1. **Format Conversion:**
   - Automatically converts to WebP for modern browsers
   - Falls back to JPEG/PNG for older browsers

2. **Compression:**
   - Reduces file size without visible quality loss
   - Balances quality vs loading speed

3. **Responsive Delivery:**
   - Serves appropriate size based on device
   - Mobile devices get smaller versions
   - Desktop gets full resolution

4. **CDN Delivery:**
   - Fast global delivery via CDN
   - Cached for quick loading
   - Reduced server load

### Manual Optimization (Optional)

Before uploading, you can manually optimize:

1. **Resize to recommended dimensions**
2. **Compress using tools like:**
   - TinyPNG (https://tinypng.com)
   - Squoosh (https://squoosh.app)
   - Photoshop "Save for Web"
3. **Convert to WebP format**
4. **Remove metadata (EXIF data)**

---

## Image Checklist

Before uploading, verify:

- [ ] Image meets recommended dimensions
- [ ] Aspect ratio is correct
- [ ] File size is under 8 MB
- [ ] Format is JPEG, PNG, or WebP
- [ ] Image quality is good (not blurry)
- [ ] Subject is properly framed
- [ ] Lighting is adequate
- [ ] Colors look natural
- [ ] No sensitive information visible
- [ ] Image is appropriate for public website

---

## Summary

### Key Points:

1. **Use recommended dimensions** for best results
2. **Maintain aspect ratios** to avoid cropping issues
3. **Keep file size under 8 MB**
4. **Use high-quality source images**
5. **Cloudinary handles optimization automatically**
6. **Check admin panel for recommended size** before upload
7. **Allow 30 seconds for images to appear** on website

### Quick Sizes:

- **Hero:** 800×1067px (Portrait)
- **News:** 1600×1000px (Landscape)
- **Gallery Wide:** 2100×900px (Wide)
- **Gallery Square:** 1200×1200px (Square)

---

**Need Help?**

If you encounter issues or have questions about image specifications, contact the development team or refer to the admin panel which displays recommended sizes for each slot.

---

**Last Updated:** May 15, 2026  
**Version:** 1.0  
**Author:** Kiro AI Assistant
