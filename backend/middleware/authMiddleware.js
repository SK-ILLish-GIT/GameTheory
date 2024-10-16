// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

/**
 * @desc    Protect routes and authenticate users
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            // Get user from the token
            req.user = await User.findById(decoded.userId).select('-password'); // Exclude password

            if (!req.user) {
                return res.status(401).json({ success: false, message: "User not found." });
            }

            next();
        } catch (error) {
            console.error("Error in authMiddleware:", error);
            res.status(401).json({ success: false, message: "Not authorized, token failed." });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: "Not authorized, no token." });
    }
};

export { protect };
