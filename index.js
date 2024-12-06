import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipeRouter } from "./routes/recipe.js";
import { chefRouter } from "./routes/chef.js";
import { commentRouter } from "./routes/comment.js";


await mongoose.connect(process.env.MONGO_URI).then (() => console.log("Database connected successfully")).catch((error) => console.log("Error connecting to database", error));

const app = express();
const port = process.env.PORT || 
3000

app.use(express.json());

app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(recipeRouter);
app.use(chefRouter);
app.use(commentRouter);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
});