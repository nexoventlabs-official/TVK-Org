const express = require('express');
const Enquiry = require('../../models/Enquiry');
const auth = require('../../middleware/auth');
const logger = require('../../config/logger');

const router = express.Router();
router.use(auth);

/**
 * GET /api/admin/dashboard
 *
 * Returns a single payload powering the entire admin dashboard:
 *
 *   stats              — totals, by-category counts, today/week deltas
 *   byCategory         — array of { category, count } for the pie chart
 *   statusBreakdown    — { new, in_progress, resolved, rejected }
 *   timeline           — daily counts for the last 30 days
 *   heatmap            — sparse [{ dow, hour, count }] for last 60 days
 *                       (Mon-first weekdays, IST hours)
 *   categoryHeatmap    — sparse [{ cat, dow, count }] for last 60 days
 *   recent             — last 8 enquiries
 *   meta               — { timelineDays, heatmapDays }
 */
router.get('/', async (_req, res) => {
  try {
    const now = new Date();
    const startToday = new Date(now); startToday.setHours(0, 0, 0, 0);
    const start7d = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    const start30d = new Date(now.getTime() - 30 * 24 * 3600 * 1000);
    const start60d = new Date(now.getTime() - 60 * 24 * 3600 * 1000);

    const [total, todayCount, weekCount, byCategoryAgg, statusAgg, timelineAgg, heatmapAgg, recent, catHeatmapAgg] = await Promise.all([
      Enquiry.countDocuments({}),
      Enquiry.countDocuments({ createdAt: { $gte: startToday } }),
      Enquiry.countDocuments({ createdAt: { $gte: start7d } }),
      Enquiry.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
      Enquiry.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
      Enquiry.aggregate([
        { $match: { createdAt: { $gte: start30d } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt', timezone: 'Asia/Kolkata' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ]),
      Enquiry.aggregate([
        { $match: { createdAt: { $gte: start60d } } },
        {
          $project: {
            // Mongo $dayOfWeek: 1=Sun..7=Sat → remap to Mon-first 0..6
            dow: {
              $mod: [
                { $add: [{ $dayOfWeek: { date: '$createdAt', timezone: 'Asia/Kolkata' } }, 5] },
                7,
              ],
            },
            hour: { $hour: { date: '$createdAt', timezone: 'Asia/Kolkata' } },
          },
        },
        { $group: { _id: { dow: '$dow', hour: '$hour' }, count: { $sum: 1 } } },
      ]),
      Enquiry.find({}).sort({ createdAt: -1 }).limit(8).lean(),
      Enquiry.aggregate([
        { $match: { createdAt: { $gte: start60d } } },
        {
          $project: {
            cat: '$category',
            dow: {
              $mod: [
                { $add: [{ $dayOfWeek: { date: '$createdAt', timezone: 'Asia/Kolkata' } }, 5] },
                7,
              ],
            },
          },
        },
        { $group: { _id: { cat: '$cat', dow: '$dow' }, count: { $sum: 1 } } },
      ]),
    ]);

    // ── Densify the 30-day timeline so days with 0 enquiries still
    //    appear (otherwise the line chart skips gaps).
    const tlMap = Object.fromEntries(timelineAgg.map((r) => [r._id, r.count]));
    const timeline = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      const key = `${y}-${m}-${dd}`;
      timeline.push({ date: key, count: tlMap[key] || 0 });
    }

    // ── byCategory: ensure all 3 categories are present even at 0.
    const catMap = Object.fromEntries(byCategoryAgg.map((r) => [r._id, r.count]));
    const byCategory = ['party', 'assembly', 'education'].map((c) => ({ category: c, count: catMap[c] || 0 }));

    const statusBreakdown = ['new', 'in_progress', 'resolved', 'rejected'].reduce((acc, s) => {
      acc[s] = (statusAgg.find((r) => r._id === s) || {}).count || 0;
      return acc;
    }, {});

    const heatmap = heatmapAgg.map((r) => ({ dow: r._id.dow, hour: r._id.hour, count: r.count }));
    const categoryHeatmap = catHeatmapAgg.map((r) => ({ cat: r._id.cat, dow: r._id.dow, count: r.count }));

    res.json({
      stats: {
        total,
        today: todayCount,
        week: weekCount,
        new: statusBreakdown.new,
        resolved: statusBreakdown.resolved,
      },
      byCategory,
      statusBreakdown,
      timeline,
      heatmap,
      categoryHeatmap,
      recent,
      meta: { timelineDays: 30, heatmapDays: 60 },
    });
  } catch (err) {
    logger.error('[admin/dashboard] error', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
