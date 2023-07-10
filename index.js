import express from "express";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./db.js";
import authRoute from "./routes/admin.js"
import userRoute from "./routes/users.js"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/admin', authRoute)
app.use('/api/user', userRoute)

app.get("/", (req,res) =>{
    res.send("This is index.js");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectToDatabase();
});