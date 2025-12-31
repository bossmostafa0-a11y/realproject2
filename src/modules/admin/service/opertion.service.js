import { servicemodels } from "../../../DB/model/service.model.js";
import { asyncHandelr } from "../../../utlis/response/error.response.js";
import { successresponse } from "../../../utlis/response/success.response.js";

import cloud from "../../../utlis/multer/cloudinary.js";
import { ServiceItemModel } from "../../../DB/model/sub.service.model.js";
import { detailsservice } from "../../../DB/model/detilesservice.model.js";


export const createservice = asyncHandelr(async (req, res, next) => {
    const { name } = req.body;

    if (!name && !req.file) {
        return next(new Error("❌ يجب إدخال اسم أو صورة على الأقل", { cause: 400 }));
    }

    let image = null;

    if (req.file) {
        const { secure_url} = await cloud.uploader.upload(
            req.file.path,
            { folder: `services` }
        );

        image = { secure_url};
    }

    const service = await servicemodels.create({
        name,
        image,
       
    });

    return successresponse(res, "✅ تم إنشاء الخدمة بنجاح", 201, { service });
});


export const addSubService = asyncHandelr(async (req, res, next) => {
    const { name, price, duration, providerName, serviceId } = req.body;

    // ✅ التحقق من الحقول الأساسية
    if (!name || !price || !duration || !providerName || !serviceId) {
        return next(new Error("❌ جميع الحقول مطلوبة", { cause: 400 }));
    }

    // التحقق من وجود الخدمة الأساسية
    const validService = await servicemodels.findById(serviceId);
    if (!validService) {
        return next(new Error("❌ الخدمة الرئيسية غير موجودة", { cause: 404 }));
    }

    // رفع الصورة (اختياري)
    let image = null;
    if (req.file) {
        const { secure_url, public_id } = await cloud.uploader.upload(
            req.file.path,
            { folder: `serviceItems` } // صورة واحدة فقط
        );
        image = { secure_url, public_id };
    }

    // إنشاء عنصر الخدمة الفرعية
    const serviceItem = await ServiceItemModel.create({
        name,
        price,
        duration,
        providerName,
        serviceId, // ربط بخدمة واحدة فقط
        image // صورة واحدة فقط
    });

    return successresponse(res, "✅ تم إنشاء الخدمة الفرعية بنجاح", 201, { serviceItem });
});




export const createdetailsservices = asyncHandelr(async (req, res, next) => {
    const { name, price, duration, providerName, serviceId, details, description, rating, completedServices } = req.body;

    // ✅ التحقق من الحقول الأساسية
    if (!name || !price || !duration || !providerName || !serviceId) {
        return next(new Error("❌ جميع الحقول الأساسية مطلوبة", { cause: 400 }));
    }

    // التحقق من وجود الخدمة الأساسية
    const validService = await servicemodels.findById(serviceId);
    if (!validService) {
        return next(new Error("❌ الخدمة الرئيسية غير موجودة", { cause: 404 }));
    }

    // رفع الصورة (اختياري)
    let image = null;
    if (req.file) {
        const { secure_url } = await cloud.uploader.upload(
            req.file.path,
            { folder: `serviceItems` }
        );
        image = { secure_url};
    }

    // إنشاء عنصر الخدمة الفرعية
    const serviceItem = await detailsservice.create({
        name,
        price,
        duration,
        providerName,
        serviceIds: serviceId ,// ربط بخدمة واحدة فقط
        images:  image , // صورة واحدة فقط
        details: details || "",
        description: description || "",
        rating: rating ? Number(rating) : 0,
        completedServices: completedServices ? Number(completedServices) : 0
    });

    return successresponse(res, "✅ تم إنشاء مزود الخدمة بنجاح", 201, { serviceItem });
})
