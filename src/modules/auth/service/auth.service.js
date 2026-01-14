

import crypto from "crypto"; // استيراد مكتبة crypto


import { usermodels } from "../../../DB/model/user.models.js";
import { sendemail } from "../../../utlis/email/sendemail.js";
import { asyncHandelr } from "../../../utlis/response/error.response.js";
import { generatetoken } from "../../../utlis/security/Token.security.js";
import { emailtemplet } from "../../../utlis/temblete/vervication.email.js";



export const login = asyncHandelr(async (req, res, next) => {
  const { email } = req.body;

  if (!email) return next(new Error(" الايميل مطلوب", { cause: 400 }));

  const user = await usermodels.findOne({ email });

  if (!user) return next(new Error("المستخدم غير موجود", { cause: 404 }));

  // توليد OTP
  const otpCode = crypto.randomInt(100000, 999999).toString();

  user.otp = otpCode;
  user.otpTime = new Date();
  await user.save();

  // هنا تبعت الإيميل

await sendemail({
  to:email,
  subject:"كود التحقق ",
  text:"تسجيل الدخو",
  html: emailtemplet(otpCode)
})

 /*   const access_Token = generatetoken({
            payload: { id: user._id },
        });*/

  return res.status(200).json({
    success: true,
    message: "تم إرسال كود OTP على الإيميل، صالح لمدة 30 دقيقة", 
  });
});


export const verifyOtp = asyncHandelr(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) return next(new Error("الايميل  والكود مطلوب", { cause: 400 }));

  const user = await usermodels.findOne({ email });

  if (!user) return next(new Error("المستخدم غير موجود", { cause: 400 }));

  if (!user.otp || !user.otpTime) {
    return next(new Error("لم يتم إرسال OTP", { cause: 400 }));
  }

  // تحقق من انتهاء 30 دقيقة
  const now = new Date();
  const diff = (now - user.otpTime) / 1000 / 60; // الفرق بالدقائق

  if (diff > 30) {
    return next(new Error("انتهت صلاحية الكود", { cause: 400 }));
  }

  if (user.otp !== otp) {
    return next(new Error("الكود غير صحيح", { cause: 400 }));
  }

  // تسجيل الدخول ناجح
  user.otp = undefined;
  user.otpTime = undefined;
  await user.save();
  const acces_token =  generatetoken({
    payload:{
      id: user._id
    }
  })

  return res.status(200).json({
    success: true,
    message: "تم  تسجيل الدخول",
    token : acces_token
    
  });
});






export const signup = asyncHandelr(async (req, res, next) => {
  const { fullName, email, phone, address } = req.body;

  // تحقق من التكرار
  const isUserExist = await usermodels.findOne({
    $or: [{ email }, { phone }]
  });

  if (isUserExist) {
    return next(new Error("الإيميل أو رقم الهاتف مستخدم بالفعل", { cause: 400 }));
  }

 

  const user = await usermodels.create({
    fullName,
    email,
    phone,
    address,
  });

  return res.status(201).json({
    success: true,
    message: "تم إنشاء الحساب، سوف يتم نقلك الي تسجيل الدخول",
    
  });
});
