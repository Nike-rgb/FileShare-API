require('dotenv').config();
module.exports = function(req, res, next) {
    res.set({
        'Access-Control-Allow-Origin' : process.env.FRONTEND_BASE_URL,
        'Access-Control-Allow-Headers' : 'content-type',
    });
    next();
}