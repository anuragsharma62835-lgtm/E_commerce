const rateLimit = require('express-rate-limit');

const apilimiter = rateLimit({
    windowMs:15*60*1000, //15 minutes
    max:1000,
    message:{message:'too many requests, please try again after 15 minutes'}
})
module.exports = apilimiter;