import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "معرف المستخدم مطلوب"]
    },

      serviceid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "detailsservice",
        required: [true, "معرف المستخدم مطلوب"]
    },

    date: {
        type: Date,
        required: [true, "تاريخ الحجز مطلوب"]
    },

    time: {
        type: String,
        required: [true, "وقت الحجز مطلوب"] // مثال: "10:30 AM" أو "18:00"
    },

    address: {
        type: String,
        required: [true, "العنوان مطلوب"]
    },

    status: {
        type: String,
       
    }

}, { timestamps: true });

export const BookingModel = mongoose.model("Booking", bookingSchema);
