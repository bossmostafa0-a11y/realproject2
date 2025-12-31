import mongoose from "mongoose";

const detailsserviceSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "اسم العنصر "] 
    },

    price: { 
        type: Number, 
        required: [true, "السعر مطلوب"] 
    },

    duration: { 
        type: String, 
        required: [true, "مدة التنفيذ مطلوبة"] // بالدقائق
    },

    providerName: { 
        type: String, 
        required: [true, "اسم مزود الخدمة مطلوب"] 
    },

    serviceIds: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "ServiceItem", 
        required: true 
    }, // ✅ Array of Services

    images: 
        {
            secure_url: { type: String }
        }
    ,

    // الحقول الجديدة
    details: { 
        type: String, 
        default: "" 
    },

    description: { 
        type: String, 
        default: "" 
    },

    rating: { 
        type: Number, 
        default: 0 
    },

    completedServices: { 
        type: Number, 
        default: 0 
    }

}, { timestamps: true });

export const detailsservice = mongoose.model("detailsservice", detailsserviceSchema);
