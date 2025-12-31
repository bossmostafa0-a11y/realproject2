export const vervicaionemailtemplet = ({ code } = {}) => {

    return `
    <p>Hello,</p>
    <p>Your secure authentication code is: <strong>${code}</strong></p>
    <p>If you didn’t request this, please ignore this email.</p>
`

}

export const emailtemplet =(otp)=>{
return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>كود التحقق realproject</title>
</head>
<body style="margin:0; padding:0; background-color:#f8f9fa; font-family:sans-serif; direction:rtl;">
    <table width="100%" cellspacing="0" cellpadding="0" border="0" style="padding:40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellspacing="0" cellpadding="0" border="0" style="background-color:#ffffff; border-radius:15px; border-top:6px solid #0B3364; box-shadow:0 4px 12px rgba(0,0,0,0.1); text-align:center;">
                    <tr>
                        <td style="padding:40px 0 20px 0;">
                            <img src="https://res.cloudinary.com/ds35kvegu/image/upload/v1767136323/services/plf9iot6olcmklhir0mw.png" alt="Boss Social Logo" width="220" style="display:block; margin:0 auto;">
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 40px;">
                            <h1 style="color:#0B3364; font-family: 'Segoe UI', Tahoma, sans-serif;">مرحباً بك في realproject</h1>
                            <p style="color:#555; font-size:16px; line-height:1.6;">أنت على بعد خطوة واحدة من الانضمام لمجتمعنا. ها هو كود التحقق الخاص بك.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:30px 0;">
                            <a href="#" style="background-color:#2CA749; color:#ffffff !important; padding:15px 35px; text-decoration:none; border-radius:8px; font-weight:bold; font-size:18px; display:inline-block;"> ${otp} </a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:20px 40px 40px 40px; color:#aaa; font-size:12px; border-top:1px solid #eee;">
                            © 2025 Boss Social. جميع الحقوق محفوظة.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`
}