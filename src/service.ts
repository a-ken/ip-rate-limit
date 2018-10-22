import { client, clientAsync } from './db';
import * as moment from 'moment';

interface CheckingResult {
    ip: string;
    status: number;
    times: number;
    reset: number; // unix timestamp
    message: string;
}

const COLUMN_TIMES = 'times';
const COLUMN_TIMESTAMP = 'timestamp';

export class IpRateLimiterService {
    private limit: number = 60; // per minutes

    async check(ip: string): Promise<CheckingResult> {
        if (!ip) throw new Error('IP address is empty');

        let result: CheckingResult = { 
            ip: ip, status: 200, times: 0, reset: 0, message: ''
        };
        if (await clientAsync.EXISTS(ip)) {
            await clientAsync.HINCRBY(ip, COLUMN_TIMES, 1);

            let times = await clientAsync.HGET(ip, COLUMN_TIMES);
            let timestamp = await clientAsync.HGET(ip, COLUMN_TIMESTAMP);
            let remaining = this.limit - times;
    
            if (times > this.limit) {
                result.status = 403;
                result.message = 'Error';
            }
            result.times = Number(times);
            result.reset = timestamp;
        } else {
            let timestamp = moment().add(1, 'minutes').unix();

            await clientAsync.HSET(ip, COLUMN_TIMES, '1');
            await clientAsync.HSET(ip, COLUMN_TIMESTAMP, timestamp);
            await clientAsync.EXPIREAT(ip, timestamp);

            result.times = 1;
            result.reset = timestamp;
        }
        return result;
    }
}