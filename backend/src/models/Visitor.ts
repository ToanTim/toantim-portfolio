import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    referer: {
      type: String,
    },
    path: {
      type: String,
      default: '/',
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Visitor = mongoose.model('Visitor', visitorSchema);
