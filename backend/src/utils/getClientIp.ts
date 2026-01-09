import { Request } from 'express';

export const getClientIp = (req: Request): string => {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0] : forwarded) ||
    req.socket.remoteAddress ||
    'unknown';
  return ip;
};
