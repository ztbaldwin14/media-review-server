const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => { /*12.2.1*/
    const token = req.headers.authorization;
    console.log('token -->', token); /*12.2.3*/
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided" })
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            console.log('decodeToken -->', decodeToken); /*12.2.3*/
            if (!err && decodeToken) {
                User.findOne({
                    where: {
                        id: decodeToken.id
                    }
                })
                  .then(user => {
                    console.log('user -->', user); /*12.2.3*/
                    if (!user) throw err;
                    console.log('req -->', req);  /*12.2.3*/
                    req.user = user;
                    return next();
                  })
                  .catch(err => next(err));
            } else {
                req.errors = err;
                return res.status(500).send('Not Authorized');
            }
        });
    }
};

module.exports = validateSession;