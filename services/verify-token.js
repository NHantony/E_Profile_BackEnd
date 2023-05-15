const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    let checkBearer = 'Bearer ';
    if (token) {
        if (token.startsWith(checkBearer)) {
            token = token.slice(checkBearer.length, token.length);

        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log('Wrong!');
                res.json({ success: false, message: 'Failded to authenticate' });
            } else {
                req.decoded = decoded;
                next();
                console.log(decoded);
            }
        });
    } else {
        res.json({ success: false, message: "No token provider" });

    }
};