import express from "express";
import authRoute from "./routes/authRoutes.js";
import posts from './routes/posts.js'
import mongoose from "mongoose";
import verify from './routes/middleware/verifyToken.js'
import dotenv from "dotenv";
const app = express();

dotenv.config();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
  
//middleware
app.use(express.json())

//route middlware
app.use("/api/user", authRoute);

//protected Route
app.use('/api/posts',verify, posts)

app.listen(3000, () => {
  console.log(`Server listening on 3000`);
});
