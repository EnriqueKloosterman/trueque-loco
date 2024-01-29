const jwt = require('jsonwebtoken');

const generateToken = (user_id) => {
    const expiresIn = 60 * 60 * 24;

    try {
        const token = jwt.sign({user_id}, process.env.JWT_SECRET, {expiresIn});
        return {token, expiresIn}
    } catch (error) {
        return res.status(500).json({ message: 'Error generating token'});
        // console.log(error);
    }
}

module.exports = {generateToken};