import * as path from 'path';
import * as Koa from 'koa';
import * as logger from 'koa-logger';

import { IpRateLimiterService } from './service';
const limiter = new IpRateLimiterService();

import * as dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = new Koa();
app.proxy = Boolean(process.env.PROXY);

// error handle
app.use(async (ctx, next) => {
    try {
        await next();
        if ((ctx.status || 404) == 404) {
            ctx.throw(404, 'Path not found');
        }
    } catch (err) {
        ctx.status = err.status = (err.status || 500);
        ctx.body = {
            error: { message: err.message }
        };
    }
});

// middlewares
app.use(logger());
app.use(async (ctx, next) => {
    const ip = ctx.ip;
    let result = await limiter.check(ip);
    ctx.status = result.status;
    ctx.body = result;
});

app.listen(process.env.PORT);