import express from "express"
import bootstap from "./src/app.controller.js"
import path from "node:path"
import dotenv from "dotenv"
dotenv.config({ path: path.resolve("./src/config/.env") })
console.log("🔹 JWT_SECRET:", process.env.JWT_SECRET);





const app = express()
const port = process.env.PORT||3000

console.log("Email:", process.env.EMAIL);
console.log("Password exists?", !!process.env.EMAIL_PASSWORD);
await bootstap(app ,express)



const httpServer = app.listen(port, () => {
    console.log(`server is runing on port ${port} mr abdo welcome`);
});

