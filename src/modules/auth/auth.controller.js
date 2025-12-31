import { Router } from "express";

const routr = Router()


import { login, signup, verifyOtp } from "./service/auth.service.js";



routr.post("/login", login)
routr.post("/singup", signup)
routr.post("/verifyotp", verifyOtp)





export default routr