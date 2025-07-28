const rateLimiter = require('express-rate-limit');

//limit login attempts
const loginLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 5,
    message: {
        success: false,
        message: 'Too many login attempts. Please try again in 15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false
})

// Limt user registration
const registerLimiter = rateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
    message: {
        success: false,
        message: 'Too many account registrations. Try again in an hour'
    },
    standardHeaders: true,
    legacyHeaders: false
});

// limit general notes access
const notesLimiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100,
    message: {
        success: false,
        message: 'Too many requests to notes API. Please slow down..'
    },
    standardHeaders: true,
    legacyHeaders: false
})


module.exports = {
    loginLimiter,
    registerLimiter,
    notesLimiter
}