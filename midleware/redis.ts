import { createClient } from 'redis';

const REDIS_HOST: string = process.env.REDIS_HOST;
const REDIS_PORT: string = process.env.REDIS_PORT;
const REDIS_CRYPT: string = process.env.REDIS_CRYPT;

const client : any = createClient({
  url: `redis://:${REDIS_CRYPT}@${REDIS_HOST}:${REDIS_PORT}`
});

client.connect();

client.on('error', function (err: any) {
  console.log(`redis://:${REDIS_CRYPT}@${REDIS_HOST}:${REDIS_PORT}`);
  console.log('Redis Error:', err);
});

export default class RedisController {
  async set (key: string, value: any) {
    try {
      await client.set(key, value, {
        EX: 60 * 60 * 24,
        NX: true
      }); 
    } catch (error) {
      console.log('[RedisController][set]',error);
    }
  }

  async get (key: string) {
    let result: any = null;
    try {
      result = await client.get(key);
    } catch (error) {
      console.log('[RedisController][get]',error);      
    }
    return result;
  }
}
