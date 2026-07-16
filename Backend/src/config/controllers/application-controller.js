const applicationModel = require('../models/application-model');
const jobModel = require('../models/job-model');
const {analyzeResume} = require("../../services/aiService")

async function createApplicationController(req, res){
    if(req.user.role !== 'student'){
        return res.status(403).json({
            message: "Only students can apply for jobs"
        })
    }
    const jobId = req.params.jobId;
    if(!jobId){
        return res.status(400).json({
            message: "Job ID is required"
        })
    }
    const existingApplication = await applicationModel.findOne({student: req.user.id, job: jobId});
    if(existingApplication){
        return res.status(400).json({
            message: "You have already applied for this job"
        })
    }else{
        const application = await applicationModel.create({
            student: req.user.id,
            job: jobId,
            status: 'applied',
        })
        res.status(201).json({
            message: "Application submitted successfully",
            application
        })
    }

}

async function getApplicationController(req, res){
       if(req.user.role !== 'student'){
        return res.status(403).json({
            message: "Only students can view their applications"
        })
       }
       const applications = await applicationModel.find({student: req.user.id}).populate('job');
       res.status(200).json(applications)
}


async function updateApplicationStatusController(req, res){
    const applicationId = req.params.applicationId;
    const status = req.body.status;
    const application = await applicationModel.findById(applicationId);
    if(!application){
        return res.status(404).json({
            message: "Application not found"
        })
    }
    const job = await jobModel.findById(application.job);
    if(job.recruiter.toString() !== req.user.id){
        return res.status(403).json({
            message: "You are not authorized to update this application"
        })
    }
    const validStatuses = ['applied', 'shortlisted', 'rejected', 'accepted'];
    if(!validStatuses.includes(status)){
        return res.status(400).json({
            message: "Invalid status"
        })
    }
    application.status = status;
    await application.save();
    return res.status(200).json({
        message: "Application status updated successfully",
        application
    })
    
}

async function testAIController(req, res) {
    try {

        const sampleResume = `
        Name: Anshuma Yadav

        Skills:
        Java
        React
        Node.js
        MongoDB
        Express.js

        Projects:
        AI Campus Placement Portal

        Internship:
        Web Development Intern

        Education:
        B.Tech CSE
        `;

        const result = await analyzeResume(sampleResume);

        res.status(200).json({
            analysis: result
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    createApplicationController, getApplicationController, updateApplicationStatusController, testAIController
}