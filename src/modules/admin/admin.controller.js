import { Router } from "express";
import { fileValidationTypes, uploadCloudFile } from "../../utlis/multer/cloud.multer.js";
import { addSubService, createdetailsservices, createservice } from "../admin/service/opertion.service.js";
import { middleware } from "../middleware/middleware.js";



const router = Router()

router.post(
    "/createService",
    middleware(),
    uploadCloudFile([...fileValidationTypes.image]).single("image"),
    createservice
);
router.post(
    "/createServiceItem",
 middleware(),
    uploadCloudFile([...fileValidationTypes.image]).single("image"),
    addSubService
);

router.post(
    "/createdetailsservices",
 middleware(),
    uploadCloudFile([...fileValidationTypes.image]).single("image"),
    createdetailsservices
);



export default router