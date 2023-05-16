const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({ error: 'Invalid token' });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decoded) =>{
        if(error){
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.user = decoded
        next();
    });
}

module.exports = {
    isAuthenticated
}