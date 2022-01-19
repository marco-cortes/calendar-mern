const jwt = require("jsonwebtoken");

const { response } = require("express");

const validateJWT = (req, res = response, next) => {
    
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "Token not found"
        });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = payload.uid;
        req.name = payload.name;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            message: "Token invalid"
        });
    }
}

module.exports = {
    validateJWT
}