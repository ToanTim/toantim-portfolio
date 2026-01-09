import express from 'express';
import { Visitor } from '../models/Visitor';
import { getClientIp } from '../utils/getClientIp';

const router = express.Router();

// Track a new visitor
router.post('/track', async (req, res) => {
  try {
    const { path } = req.body;
    const ipAddress = getClientIp(req);
    const userAgent = req.get('user-agent') || '';
    const referer = req.get('referer') || '';

    const visitor = new Visitor({
      ipAddress,
      userAgent,
      referer,
      path: path || '/',
    });

    await visitor.save();

    res.status(201).json({
      success: true,
      message: 'Visitor tracked',
      data: visitor,
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ success: false, message: 'Error tracking visitor' });
  }
});

// Get visitor analytics
router.get('/analytics', async (req, res) => {
  try {
    const totalVisitors = await Visitor.countDocuments();
    const uniqueVisitors = await Visitor.distinct('ipAddress');
    const visitorsByPath = await Visitor.aggregate([
      {
        $group: {
          _id: '$path',
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const last7Days = await Visitor.find({
      timestamp: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    }).countDocuments();

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        uniqueVisitors: uniqueVisitors.length,
        visitorsByPath,
        last7Days,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: 'Error fetching analytics' });
  }
});

// Get all visitors (admin only)
router.get('/list', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 50;
    const skip = (page - 1) * limit;

    const visitors = await Visitor.find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Visitor.countDocuments();

    res.status(200).json({
      success: true,
      data: visitors,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ success: false, message: 'Error fetching visitors' });
  }
});

export default router;
