import mongoose from "mongoose";

const serviceItemSchema = new mongoose.Schema({
    name: { type: String, required: [true, "اسم العنصر مطلوب"] },
    price: { type: Number, required: [true, "السعر مطلوب"] },
    duration: { type: String, required: [true, "مدة التنفيذ مطلوبة"] }, // بالدقائق
    providerName: { type: String, required: [true, "اسم مزود الخدمة مطلوب"] },
    serviceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }], // ✅ Array of Services
    images: [
        {
            secure_url: { type: String },
     
        }
    ]
}, { timestamps: true });

export const ServiceItemModel = mongoose.model("ServiceItem", serviceItemSchema);
