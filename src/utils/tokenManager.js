const jwt = require('jsonwebtoken');

const generateToken = (uid) => {
    const expiresIn = '1d';
    const secret = process.env.JWT_SECRET;
    try {
        const token = jwt.sign({uid},secret, {expiresIn});
        return {token, expiresIn}
    } catch (error) {
        return res.status(500).json({ message: 'Error generating token'});
        // console.log(error);
    }
}

module.exports = generateToken;