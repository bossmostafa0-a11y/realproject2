import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: [true, "اسم الخدمة مطلوب"] },
    image: {
        secure_url: { type: String },
        public_id: { type: String }
    },
    
}, { timestamps: true });

export const servicemodels = mongoose.model("Service", serviceSchema);
