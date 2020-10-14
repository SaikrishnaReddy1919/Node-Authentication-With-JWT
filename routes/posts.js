import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        posts: {
            title: 'Welcome to Auth using JWT',
            description : 'Login to access'
        }
    })
})

export default router;