import jwt from 'jsonwebtoken'

const generateToken = (res, userId) => {
    //set jwt token
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '15m',
    })

    //set jwt at http only cookie
    res.cookie('jwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000, // 15 mins
    })
}

export default generateToken