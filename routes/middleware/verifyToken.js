import jwt from 'jsonwebtoken'

const verify = (req, res, next) => {
    const token = req.header('authToken')
    if (!token) return res.status(401).send("Access denied. Please login")
    
    try {
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified //return id
        next()
    } catch (error) {
        res.status(400).send("Invalid token")
    }
}

export default verify