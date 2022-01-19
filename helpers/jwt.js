const jwt = require("jsonwebtoken");

//Como crear una promesa en un callback
const generateJWT = (uid, name) => {
    
    return new Promise((resolve, reject) => {
        const payload = {uid, name};
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject("Can't generate token");
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT,
}