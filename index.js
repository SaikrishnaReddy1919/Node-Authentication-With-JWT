import express from 'express'
import authRoute from './routes/authRoutes.js'
const app = express()

//route middlware
app.use('/api/user', authRoute)

app.listen(3000, () => {
    console.log(`Server listening on 3000`)
})