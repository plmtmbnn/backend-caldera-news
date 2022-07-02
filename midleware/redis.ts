import { createClient } from 'redis';

var client : any = createClient({
  url: 'redis://default:N1ZikVdsY0kkbCBiUjCkIhYXQDmJjcBE@redis-10006.c273.us-east-1-2.ec2.cloud.redislabs.com:10006'
 });

client.connect();

client.on('error', function (err: any) {
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
