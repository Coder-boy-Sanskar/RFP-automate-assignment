import express from "express";
import {
  getEmailSent,
  getRfps,
  getVendorDetails,
  getvendorResList,
  sendEmailToAll,
} from "../controllers/rfp.controller.js";

const router = express.Router();

router.post("/get-vendors", getVendorDetails);
router.post("/send-emails", sendEmailToAll);
router.post("/get-rfps", getRfps);
router.post("/get-rfp-emailsent", getEmailSent);

router.post("/get-vendor-response", getvendorResList);

export default router;
