const jwt = require('jsonwebtoken');

const requireToken = (req, res, next) => {
    const secret =  process.env.JWT_SECRET;
    try {
        let token = req.cookies.token;
        if(!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const {uid} = jwt.verify(token, secret);
        req.user_id = uid;
        next();
    } catch (error) {
        const TokenVerificationErrors ={
            "invalid signature": "La firma del JWT no es válida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no válido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed": "JWT formato no válido"  
        }
        return res.status(401).json({ error: TokenVerificationErrors[error.message] })
    }
}

module.exports = requireToken;