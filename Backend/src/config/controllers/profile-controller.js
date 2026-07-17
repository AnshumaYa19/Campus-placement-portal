const userModel = require("../models/user-model");
const {analyzeResume} = require("../../services/aiService")
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path")
const cloudinary = require("../cloudinary"); 
const streamifier = require("streamifier");

async function getProfileController(req, res){
    try{
        const userId = req.user.id;
        const user = await userModel.findOne({_id: userId}).select("-password");
        if(!user){
        return res.status(404).json({
            message: "User not found"
            })
        }
        return res.status(200).json(user);
    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }    
}

async function updateProfileController(req, res){
    try{
        const userId = req.user.id;
        const {phone, cgpa, branch, skills} = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { phone, cgpa, branch, skills },
            { new: true }
        ).select("-password");
        if(!updatedUser){
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch(err){
        return res.status(500).json({
            message: err.message
        })
    }    
}

async function uploadResumeController(req, res) {
    try{
        if (!req.file) {
            return res.status(400).json({
            message: "Please upload a resume"
            });
        }
    
        const uploadStream = () =>
            new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "placement-portal/resumes",
                        resource_type: "raw",
                        use_filename: true,
                        unique_filename: true,
                        format: "pdf"

                    },
                    (error, result) => {
                        if (error) return reject(error);
                        resolve(result);
                    }
                );

                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });

        const result = await cloudinary.uploader.upload(filePath, {
                            folder: "placement-portal/resumes",
                            resource_type: "raw",
                            public_id: `resume_${Date.now()}.pdf`
        });     
        const user = await userModel.findById(req.user.id);

        user.resume = result.secure_url;

        await user.save();

        res.status(200).json({
            message: "Resume uploaded successfully",
            resume: user.resume
        });
    }catch(err){
        console.error(err);

        res.status(500).json({
            message: "Resume upload failed",
            error: err.message
        });
    }
}
    
    

async function analyzeResumeController(req, res) {

    const user = await userModel.findById(req.user.id);

    if (!user.resume) {
        return res.status(400).json({
            message: "Resume not uploaded"
        });
    }
    
    const filePath = path.resolve(user.resume);
    const dataBuffer = fs.readFileSync(filePath);
 
    const parsed = await pdf(dataBuffer);

    const analysis = await analyzeResume(parsed.text);

    res.status(200).json({
        analysis
    });

}

module.exports = {getProfileController, updateProfileController, uploadResumeController, analyzeResumeController};