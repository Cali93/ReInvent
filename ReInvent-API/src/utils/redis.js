import Redis from 'ioredis';
import { API_CONFIG } from 'config';

export const redis = new Redis(API_CONFIG.redisConfig.url);
