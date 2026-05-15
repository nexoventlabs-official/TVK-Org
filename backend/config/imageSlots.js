/**
 * Catalog of every "uploadable image slot" the public marketing site
 * exposes. The admin Photos page reads this list and lets an operator
 * upload one image per slot; the public site fetches the resulting
 * URLs and renders them in place of the design's grey placeholders.
 *
 * Adding a new slot:
 *   1. Pick a stable `slot` key (snake_case, safe in URLs).
 *   2. Set `group` to whichever section it belongs to so the admin
 *      page can group cards visually.
 *   3. Set `aspect` ("portrait" | "landscape" | "square" | "wide")
 *      to drive the preview tile shape on the admin page.
 *   4. Add the slot to the matching public-site component (Hero,
 *      News, Gallery, …) using the useSiteImages() hook.
 */

const IMAGE_SLOTS = [
  // ── Hero (homepage left panel) ──────────────────────────────
  {
    slot: 'hero_portrait',
    group: 'Hero',
    label: 'Hero Portrait',
    description:
      'Primary portrait shown on the homepage left panel. Fills 52% width × 100vh height on desktop.',
    aspect: 'portrait',
    recommendedSize: '2000×2160px (0.93:1 ratio)',
  },

  // ── Latest News (homepage) ──────────────────────────────────
  {
    slot: 'news_featured',
    group: 'News',
    label: 'News · Featured',
    description: 'Cover image for the large featured news article (left card on homepage). Height: 210px.',
    aspect: 'wide',
    recommendedSize: '1800×420px (4.3:1 ratio)',
  },
  {
    slot: 'news_secondary_1',
    group: 'News',
    label: 'News · Card 2',
    description: 'Cover image for the second news card (Education). Height: 150px.',
    aspect: 'landscape',
    recommendedSize: '900×300px (3:1 ratio)',
  },
  {
    slot: 'news_secondary_2',
    group: 'News',
    label: 'News · Card 3',
    description: 'Cover image for the third news card (TVK). Height: 150px.',
    aspect: 'landscape',
    recommendedSize: '900×300px (3:1 ratio)',
  },

  // ── Gallery (homepage) ──────────────────────────────────────
  {
    slot: 'gallery_1',
    group: 'Gallery',
    label: 'Gallery · TVK Event',
    description: 'Top-row first cell — wide (2fr width × 220px height). Tag: "TVK Event".',
    aspect: 'wide',
    recommendedSize: '1800×450px (4:1 ratio)',
  },
  {
    slot: 'gallery_2',
    group: 'Gallery',
    label: 'Gallery · MLA Office',
    description: 'Top-row second cell (1fr width × 220px height). Tag: "MLA Office".',
    aspect: 'landscape',
    recommendedSize: '900×450px (2:1 ratio)',
  },
  {
    slot: 'gallery_3',
    group: 'Gallery',
    label: 'Gallery · School Visit',
    description: 'Top-row third cell (1fr width × 220px height). Tag: "School Visit".',
    aspect: 'landscape',
    recommendedSize: '900×450px (2:1 ratio)',
  },
  {
    slot: 'gallery_4',
    group: 'Gallery',
    label: 'Gallery · Programme',
    description: 'Bottom-row first cell (1fr width × 130px height). Tag: "Programme".',
    aspect: 'landscape',
    recommendedSize: '900×260px (3.5:1 ratio)',
  },
  {
    slot: 'gallery_5',
    group: 'Gallery',
    label: 'Gallery · Meeting',
    description: 'Bottom-row second cell (1fr width × 130px height). Tag: "Meeting".',
    aspect: 'landscape',
    recommendedSize: '900×260px (3.5:1 ratio)',
  },
  {
    slot: 'gallery_6',
    group: 'Gallery',
    label: 'Gallery · School',
    description: 'Bottom-row third cell (1fr width × 130px height). Tag: "School".',
    aspect: 'landscape',
    recommendedSize: '900×260px (3.5:1 ratio)',
  },
  {
    slot: 'gallery_7',
    group: 'Gallery',
    label: 'Gallery · Rally',
    description: 'Bottom-row fourth cell (1fr width × 130px height). Tag: "Rally".',
    aspect: 'landscape',
    recommendedSize: '900×260px (3.5:1 ratio)',
  },
  {
    slot: 'gallery_8',
    group: 'Gallery',
    label: 'Gallery · Photo 8',
    description: 'Additional gallery photo shown on the /gallery page. Tag can be customised.',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_9',
    group: 'Gallery',
    label: 'Gallery · Photo 9',
    description: 'Additional gallery photo shown on the /gallery page. Tag can be customised.',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_10',
    group: 'Gallery',
    label: 'Gallery · Photo 10',
    description: 'Additional gallery photo shown on the /gallery page. Tag can be customised.',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_11',
    group: 'Gallery',
    label: 'Gallery · Photo 11',
    description: 'Additional gallery photo shown on the /gallery page. Tag can be customised.',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },

  // ── Gallery page extras (only shown on /gallery, not on the home grid) ──
  {
    slot: 'gallery_extra_1',
    group: 'Gallery Page',
    label: 'Gallery Page · Inauguration',
    description: 'Extra photo shown only on the /gallery page (1fr width × 200px height). Tag: "Inauguration".',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_extra_2',
    group: 'Gallery Page',
    label: 'Gallery Page · Cadre Meet',
    description: 'Extra photo shown only on the /gallery page (1fr width × 200px height). Tag: "Cadre Meet".',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_extra_3',
    group: 'Gallery Page',
    label: 'Gallery Page · Press Briefing',
    description: 'Extra photo shown only on the /gallery page (1fr width × 200px height). Tag: "Press Briefing".',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_extra_4',
    group: 'Gallery Page',
    label: 'Gallery Page · Site Visit',
    description: 'Extra photo shown only on the /gallery page (1fr width × 200px height). Tag: "Site Visit".',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
  {
    slot: 'gallery_extra_5',
    group: 'Gallery Page',
    label: 'Gallery Page · Public Meeting',
    description: 'Extra photo shown only on the /gallery page (1fr width × 200px height). Tag: "Public Meeting".',
    aspect: 'landscape',
    recommendedSize: '900×400px (2.25:1 ratio)',
  },
];

const SLOT_KEYS = new Set(IMAGE_SLOTS.map((s) => s.slot));

function findSlot(key) {
  return IMAGE_SLOTS.find((s) => s.slot === key) || null;
}

module.exports = { IMAGE_SLOTS, SLOT_KEYS, findSlot };
