import { usermodels } from "../../DB/model/user.models.js";
import { asyncHandelr } from "../../utlis/response/error.response.js";
import { decodedToken, verifytoken } from "../../utlis/security/Token.security.js";

export const middleware = () => {
    return asyncHandelr(async (req, res, next) => {
        const {authheader} = req.headers;

        // 1️⃣ التحقق من وجود Authorization header
        if (!authheader) {
            return next(new Error("التوكن مطلوب لتسجيل الدخول", { cause: 401 }));
        }

        const token = authheader.split(" ")[1];

        // 2️⃣ فك التوكن
        const decoded = await verifytoken({ token });

        if (!decoded || !decoded.id) {
            return next(new Error("توكن غير صالح", { cause: 401 }));
        }

        // 3️⃣ التأكد من وجود المستخدم في قاعدة البيانات
        const user = await usermodels.findById(decoded.id);

        if (!user) {
            return next(new Error("المستخدم غير موجود", { cause: 404 }));
        }

        // 4️⃣ كل حاجة تمام، نخزن بيانات المستخدم في req.user
        req.user = user;

        // 5️⃣ نمرر التحكم للصفحة التالية
        next();
    });
};