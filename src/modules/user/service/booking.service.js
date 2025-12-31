import { BookingModel } from "../../../DB/model/bookingmodel.js";
import { servicemodels } from "../../../DB/model/service.model.js";
import { asyncHandelr } from "../../../utlis/response/error.response.js";
import { successresponse } from "../../../utlis/response/success.response.js";


export const createBooking = asyncHandelr(async (req, res, next) => {
    const { date, time, address , serviceid } = req.body;

    // ✅ التحقق من البيانات المطلوبة
    if (!date || !time || !address || !serviceid) {
        return next(new Error("❌ جميع بيانات الحجز مطلوبة", { cause: 400 }));
    }

    // ✅ إنشاء الحجز
    const booking = await BookingModel.create({
       serviceid,
        userId: req.user._id, // جاي من middleware authentication
        date,
        time,
        address,
        status: "تم تاكيد الحجز"
    });

    

    return successresponse(
        res,
        "✅ تم إنشاء الحجز بنجاح",
        201,
        { booking }
    );
});

export const getMyBookings = asyncHandelr(async (req, res, next) => {
    // المستخدم جاي من middleware (req.user)
    const userId = req.user._id;

    // جلب كل حجوزات المستخدم
    const bookings = await BookingModel.find({ userId })
        .sort({ createdAt: -1 }); // الأحدث أولاً

    return successresponse(
        res,
        "✅ تم جلب جميع حجوزاتك بنجاح",
        200,
        { bookings }
    );
});

export const deleteBooking = asyncHandelr(async (req, res, next) => {
    const { bookingid } = req.body;

    if (!bookingid) {
        return res.status(400).json({
            success: false,
            message: "❌ معرف الحجز مطلوب"
        });
    }

    const booking = await BookingModel.findById(bookingid);

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "❌ الحجز غير موجود"
        });
    }

    await BookingModel.findByIdAndDelete(bookingid);

    return successresponse( res ,"✅ تم حذف الحجز بنجاح", 200);
});


