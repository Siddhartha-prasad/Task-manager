require("dotenv").config({ path: "./backend/.env" });
const express= require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app= express();

const authRoutes= require("./routes/authRoutes");
const taskRoutes= require("./routes/taskRoutes");



app.use(cors({
    origin: "https://task-manager-three-bay.vercel.app",
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/",(req, res) =>{
    res.send("Task manager API running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> {
    console.log(`server running on port ${PORT}`);
});
