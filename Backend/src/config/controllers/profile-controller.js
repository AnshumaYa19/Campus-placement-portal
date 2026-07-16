const userModel = require("../models/user-model");
const {analyzeResume} = require("../../services/aiService")
const pdf = require("pdf-parse");
const fs = require("fs");
const path = require("path")

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

    if (!req.file) {
        return res.status(400).json({
            message: "Please upload a resume"
        });
    }

    const user = await userModel.findById(req.user.id);

    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
        message: "Resume uploaded successfully",
        resume: user.resume
    });

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