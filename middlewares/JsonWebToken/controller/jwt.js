
const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET;

// function to sign user token
const signJwt = (payload, expires = '1h') => {
    const token = jwt.sign(payload, secret, { expiresIn: expires });
    return token;
};

// middleware to verify user token
const verifyJwt = () => (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {

        const bearer = token.split(' ');
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, secret, (error, decoded) => {
            if (error) {
                return res.status(403).json({ success: false, message: error.message });
            } else {
                req.decoded = decoded;
                next(); // goes to 'next' accessible router
            }
        })

    } else {
        return res.status(403).json({ success: false, message: 'Nonauthentic token!' });
    }
}

const objectModuleToExports = {
    signJwt,
    verifyJwt
};

module.exports = objectModuleToExports;
