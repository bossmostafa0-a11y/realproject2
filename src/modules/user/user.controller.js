import { Router } from "express";
import { createBooking, deleteBooking, getMyBookings } from "./service/booking.service.js";
import { middleware } from "../middleware/middleware.js";
import {  getsubservice, getservice ,  searchServicesOrSub, updateUserProfile, getpageservice } from "./service/user.service.js";




const router = Router()
//حجز 
router.post("/createbooking", middleware()  , createBooking )
//جلب الحوجزات الخاصة بالعميل
router.get("/getmybookings", middleware()  , getMyBookings )
//بحث
router.post("/searchservices", middleware()  , searchServicesOrSub )
//جلب الخددمات
router.get("/getservices", middleware()  , getservice )
//جلب الخدمات الرئيسية
router.get("/getsubservices", middleware()  , getsubservice )
//حذف الحجز
router.delete("/deletbooking", middleware(), deleteBooking)
//تحديث بروفيل المستخدم
router.patch("/updateprofile", middleware() , updateUserProfile)
//  جلب مزود الخدمة
router.post("/getprovide", middleware() , getpageservice)





export default router