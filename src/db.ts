import * as redis from 'redis';
import { promisify } from 'util';

export const client = redis.createClient({
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT || 6379),
});

export const clientAsync = {
    HGET: promisify(client.HGET).bind(client),
    HSET: promisify(client.HSET).bind(client),
    EXISTS: promisify(client.EXISTS).bind(client),
    HINCRBY: promisify(client.HINCRBY).bind(client),
    EXPIREAT: promisify(client.EXPIREAT).bind(client),
}

client.on('error', err => {
    console.error(err);
});