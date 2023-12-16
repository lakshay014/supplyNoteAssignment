const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");
const express = require("express")
const app = express()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const Authenticate = async (req, res, next) => {
    try {
        // const token = req.cookies.jwtoken
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            const error = new Error('Not Authenticated!');
            error.statusCode = 401;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyToken);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens:token": token });
        if (!rootUser) { throw new Error("User not found"); }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;
        next();
    } catch (error) {
        res.status(401).send("Unauthorized: No token provided")
        console.log(error);
    }
}
module.exports = Authenticate;

/*
const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not Authenticated!');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not Authenticated!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
*/