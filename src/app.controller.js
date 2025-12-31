import { connectDB } from "./DB/connection.js"
import { globalerror } from "./utlis/response/error.response.js"
import usercontrolerr from "./modules/user/user.controller.js"
import authcontroller from "./modules/auth/auth.controller.js"
import admincontroller from "./modules/admin/admin.controller.js"



export const bootstap = (app , express) => {
    app.use(express.json())
    connectDB();
    app.use("/auth", authcontroller)
    app.use("/user" , usercontrolerr)
    app.use(globalerror)
    app.use("/admin", admincontroller )

}



export  default bootstap