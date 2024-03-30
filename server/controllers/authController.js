import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';


//@desc     Register user
//@route    POST /api/auth/register
//@access   Private
const registerUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    let existingUser = await User.findOne({email})
    if(existingUser) {
        res.status(400)
        throw new Error('User already exists')
    }else{
        const user = await User.create({
            email,
            password
        })
        generateToken(res, user._id)
        res.status(201).json({
            'message': 'Editor created'
        })
    }
})

//@desc     Auth user
//@route    POST /api/auth/login
//@access   Public
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id)
        res.status(200).json({
            isAdmin: user.isAdmin,
            isEditor: user.isEditor,
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

//@desc Logout User
//@route POST /api/auth/logout
//@access Private
const logoutUser = asyncHandler(async(req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'Logged out successfully'})
})

export {
    authUser,
    registerUser,
    logoutUser,
}