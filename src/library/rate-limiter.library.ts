import rateLimit from 'express-rate-limit';

const LIMIT_IN_MS = 1000 * 60 * 15;
const REQUESTS = 20;

const rateLimiter = rateLimit({
	windowMs: LIMIT_IN_MS,
	max: REQUESTS,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	skipSuccessfulRequests: true,
	headers: false,
});

export default rateLimiter;
