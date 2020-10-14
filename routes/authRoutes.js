//using ES6 imports/exports
import express from 'express'
const router = express.Router()

router.get('/register', (req, res) => {
    res.send("Registered")
})

router.get('/login', (req, res) => {
    res.send("Login")
})

export default router
