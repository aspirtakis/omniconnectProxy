const router = require('express').Router();
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Maximum of 10 calls per 30 seconds
const MAX_REQUEST_WINDOW = 60000;
const MAX_REQUESTS = 10;
const limiter = rateLimit({
    windowMs: MAX_REQUEST_WINDOW,
    max: MAX_REQUESTS
});

// Slow down the response after 3 requests with 500 ms per requests
const DELAY_WINDOW = 60000;
const DELAY_TIME = 500;
const DELAY_AFTER_REQUEST = 3;
const speedLimiter = slowDown({
    windowMs: DELAY_WINDOW,
    delayAfter: DELAY_AFTER_REQUEST,
    delayMs: DELAY_TIME
});

const BASE_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const ENDPOINT = `${BASE_URL}${process.env.WEBHOOK_ID}`;

router.post('/sms', limiter, speedLimiter, async(req, res, next) => {
    try {
        const config = {
            headers: {
                key: API_KEY
            }
        };

        // 1. make a request to API
        const { data } = await axios.post(ENDPOINT, req.body, config);

        // 2. respond to this request with data from API
        return res.json(data);
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
