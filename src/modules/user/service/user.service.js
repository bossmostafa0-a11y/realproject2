
import { detailsservice } from "../../../DB/model/detilesservice.model.js";
import { servicemodels } from "../../../DB/model/service.model.js";
import { ServiceItemModel } from "../../../DB/model/sub.service.model.js";
import { usermodels } from "../../../DB/model/user.models.js";
import { asyncHandelr } from "../../../utlis/response/error.response.js";
import { successresponse } from "../../../utlis/response/success.response.js";

export const searchServicesOrSub = asyncHandelr(async (req, res, next) => {
    const { keyword, providerName, minPrice, maxPrice, minRating, maxRating , name } = req.body;
console.log(keyword)
    if (!keyword) {
        return res.status(400).json({
            success: false,
            message: "❌ يجب إدخال كلمة البحث"
        });
    }

    // 🔹 لو الكلمة sub → البحث داخل الفئات (Categories / Sub Services)
    if (keyword.toLowerCase() === "sub") {
        const filter = {};

        if (providerName) {
            filter.providerName = { $regex: providerName, $options: "i" };
        }
        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        if (minRating || maxRating) {
            filter.rating = {};
            if (minRating) filter.rating.$gte = Number(minRating);
            if (maxRating) filter.rating.$lte = Number(maxRating);
        }

        const subServices = await ServiceItemModel.find(filter).sort({ createdAt: -1 });

        if (!subServices.length) {
            return res.status(404).json({
                success: false,
                message: "❌ لا توجد فئات متاحة بالمعايير المطلوبة"
            });
        }

        return successresponse(res, "✅ تم جلب الفئات بنجاح", 200, subServices);
    }

    // 🔹 غير كده → البحث في الخدمات الأساسية
    const services = await servicemodels.find({
        name: { $regex: keyword, $options: "i" }
    }).sort({ createdAt: -1 });

    if (!services.length) {
        return res.status(404).json({
            success: false,
            message: `❌ الخدمة "${keyword}" غير متاحة`
        });
    }

    return successresponse(res, "✅ تم جلب الخدمات بنجاح", 200, services);
});


export const getservice = asyncHandelr(async (req, res, next) => {
    // المستخدم جاي من middleware (req.user)


 
    // جلب كل المستخدمين كـ Plain JS Object لتجنب مشاكل circular structure
   const servicesss = await servicemodels.find().lean() 

    if (!servicesss.length) {
        return res.status(404).json({
            success: false,
            message: "❌ لا يوجد خدمات"
        });
    }

    return successresponse(res, "✅ تم جلب جميع المستخدمين بنجاح", 200, servicesss);

});


export const getsubservice = asyncHandelr(async (req, res, next) => {
    // المستخدم جاي من middleware (req.user)


 
    // جلب كل المستخدمين كـ Plain JS Object لتجنب مشاكل circular structure
   const servicess = await ServiceItemModel.find().lean() 

    if (!servicess.length) {
        return res.status(404).json({
            success: false,
            message: "❌ لا يوجد خدمات"
        });
    }

    return successresponse(res, "✅ تم جلب جميع المستخدمين بنجاح", 200, servicess);

});


export const updateUserProfile = asyncHandelr(async (req, res, next) => {
    const { fullName, email, phone, address } = req.body;
    const userId = req.user._id; // المستخدم المسجل دخول

    // التحقق إن فيه حاجة تتعدل
    if (!fullName && !email && !phone && !address) {
        return res.status(400).json({
            success: false,
            message: "❌ يجب إدخال حقل واحد على الأقل للتعديل"
        });
    }

    // التحقق من تكرار الإيميل
    if (email) {
        const existingEmail = await usermodels.findOne({ email, _id: { $ne: userId } });
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "❌ الإيميل مستخدم بالفعل"
            });
        }
    }

    // التحقق من تكرار رقم الهاتف
    if (phone) {
        const existingPhone = await usermodels.findOne({ phone, _id: { $ne: userId } });
        if (existingPhone) {
            return res.status(400).json({
                success: false,
                message: "❌ رقم الهاتف مستخدم بالفعل"
            });
        }
    }

    // تحديث البيانات
    const updatedUser = await usermodels.findByIdAndUpdate(
        userId,
        { 
            $set: { 
                ...(fullName && { fullName }), 
                ...(email && { email }), 
                ...(phone && { phone }),
                ...(address && { address })
            } 
        },
        { new: true, runValidators: true }
    ).lean();

    return successresponse(res, "✅ تم تحديث بيانات المستخدم بنجاح", 200, updatedUser);
});


export const  getpageservice = (async (req, res, next) =>{
    const {id} = req.body
    if (!id) {
          return res.status(400).json({
           
            message: "❌ يجب إدخال حقل واحد على الأقل للتعديل"
        });
    }

    const provide =  await detailsservice.findById(id)

    if (!provide) {
             return res.status(400).json({
           
            message: "المزود غير متاح"
        });
    }

   return res.status(201).json({
           
            message: "تم بنجاح",
            provideis: provide
        });

})