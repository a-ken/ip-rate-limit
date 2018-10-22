import * as path from 'path';
import * as request from 'request-promise';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env.test') });

const server = process.env.SERVER || '';
const clientIP = process.env.CLIENT_IP || '';

(async function() {
    let times = 70;
    let result: any;
    for (let index = 1; index <= times; index ++) {
        try {
            result = await request.get(
                server, { headers: { 'X-Forwarded-For': clientIP } }
            );
            if (index == 30) {
                console.log(result);
            }
        } catch (err) {
            result = err.error;
        }
    }
    console.log(result);
    process.exit(0);
})();