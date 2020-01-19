const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Gets token
    const token = req.header('Authorization').split(' ')[1];
    
    // They are not priviliged
    if(!token)
        res.status(401).send(`Access denied`);

    try {
        // Encode token to get payload (data)
        const verified = JWT.verify(token, process.env.JWT_SECRET);

        // Pass the _id of user
        req.user = verified;
        
        // Continue with route
        next();
    } catch (err) {
        // They are not priviliged
        res.status(401).send(`Invalid token`);
    }
};