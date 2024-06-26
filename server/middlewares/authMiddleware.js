import jwt from 'jsonwebtoken'
import asyncHandler from '../utils/asyncHandler.js'
import User from '../models/userModel.js'

//Protect routes

const protect = asyncHandler(async (req, res, next) => {

    let token
    //Read jwt cookie
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Unauthorized Access, token failed')
        }
    } else {
        res.status(401)
        throw new Error('Unauthorized Access, no token')
    }
})

const admin = asyncHandler(async (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Not authorized as Admin')
    }
})

export {
    protect,
    admin
}