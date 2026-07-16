const express = require("express");
const authUser = require("../../middlewares/auth-middleware");
const upload = require("../../middlewares/upload-middleware")
const path = require("path")

const profileRouter = express.Router();
const profileController = require("../controllers/profile-controller");

profileRouter.get("/getprofile", authUser, profileController.getProfileController);

profileRouter.put("/updateprofile", authUser, profileController.updateProfileController);

profileRouter.post("/uploadResume", authUser, upload.single("resume"), profileController.uploadResumeController);

profileRouter.get("/analyze-resume", authUser, profileController.analyzeResumeController);
module.exports = profileRouter;