import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL ?? 'redis://10.10.7.72:6399'; //always use ipv4 not localhost

export const redis = createClient({
  url: redisUrl,
  socket: {
    family: 4,
    reconnectStrategy: retries => Math.min(retries * 50, 500), 
  },
});

redis.on('connect', () => console.log(`[Redis] 🔌 Connecting to ${redisUrl}`));
redis.on('ready', () => console.log('[Redis] Ready & Cached!'));
redis.on('error', err => console.error('[Redis]  Error:', err.message));

export async function initRedis() {
  try {
    if (redis.isOpen) {
      console.log('[Redis] Already connected');
      return;
    }
    
    console.log('[Redis] Initial connect...');
    await redis.connect();
    const pong = await redis.ping();
    console.log('[Redis] PING:', pong);
  } catch (error: any) {
    console.error('[Redis] Init failed:', error.message);
    throw error;  
  }
}