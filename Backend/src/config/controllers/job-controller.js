const jobModel =require('../models/job-model');
const applicationModel = require('../models/application-model');

async function createJobController(req, res){
    const {title, company, description, location, salary, requiredSkills, deadline} = req.body;
    if(!req.user || req.user.role !== 'recruiter'){
        return res.status(403).json({
            message: "Only recruiters can create jobs"
        })
    }
    if(!title || !company || !description || !location || !requiredSkills || requiredSkills.length ===0 || !deadline){
        return res.status(400).json({
            message: "Please provide all required fields"
        })
    }
    const job = await jobModel.create({
        title, company, description, location, salary, requiredSkills, deadline, recruiter: req.user.id
    })
    res.status(201).json({
        message: "Job successfully created",
        job 
    })
}

async function getMyJobsController(req, res) {

    if (req.user.role !== "recruiter") {
        return res.status(403).json({
            message: "Only recruiters can access this."
        });
    }

    const jobs = await jobModel.find({
        recruiter: req.user.id
    });
    
    const jobsWithApplicants = await Promise.all(

        jobs.map(async (job) => {

            const applicantCount = await applicationModel.countDocuments({
                job: job._id
            });

            return {
                _id: job._id,
    title: job.title,
    company: job.company,
    description: job.description,
    location: job.location,
    salary: job.salary,
    requiredSkills: job.requiredSkills,
    deadline: job.deadline,
    recruiter: job.recruiter,
    applicantCount: applicantCount
            };

        })

    );
    res.status(200).json(jobsWithApplicants);
}

async function getJobsController(req, res){
    const jobs = await jobModel.find().populate('recruiter', 'name email');
    res.status(200).json(jobs);
}

async function getJobByIdController(req, res){
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate('recruiter', 'name email');
    if(!job){
        return res.status(404).json({
            message: "Job not found"
        })
    }
    res.status(200).json(job);
}

async function updateJobController(req, res){
    const jobId = req.params.id;
    if(!jobId){
        return res.status(400).json({
            message: "Job ID is required"
        })
    }

    const job = await jobModel.findById(jobId);
    if(!job){
        return res.status(404).json({
            message: "Job not found"
        })
    }
    if(job.recruiter.toString() !== req.user.id){
        return res.status(403).json({
            message: "You are not authorized to update this job"
        })
    }

    const {title, company, description, location, salary, requiredSkills, deadline} = req.body;
    const updatedJob = await jobModel.findByIdAndUpdate(jobId, {
        title, company, description, location, salary, requiredSkills, deadline
    }, { new: true });
    res.status(200).json({
        message: "Job updated successfully",
        job: updatedJob
    });
}

async function deleteJobController(req, res){
    const jobId = req.params.id;
    if(!jobId){
        return res.status(400).json({
            message: "Job ID is required"
        })
    }
    const job = await jobModel.findById(jobId);
    if(!job){
        return res.status(404).json({
            message: "Job not found"
        })
    }
    if(job.recruiter.toString() !== req.user.id){
        return res.status(403).json({
            message: "You are not authorized to delete this job"
        })
    }
    await jobModel.findByIdAndDelete(jobId);
    res.status(200).json({
        message: "Job deleted successfully"
    })
}

async function getApplicantsForJobController(req, res){
    const jobId = req.params.jobId;
    const job = await jobModel.findById(jobId);
    if(!job){
        return res.status(404).json({
            message: "job not found"
        })
    }
    if(job.recruiter.toString() !== req.user.id){
        return res.status(403).json({
            message: "You are not authorized to view this application"
        })
    }
    const application = await applicationModel.find({job: jobId}).populate('student', 'name email branch cgpa');
    if(application.length === 0){
        return res.status(200).json([])
    }
    res.status(200).json(application);
}

module.exports = {
    createJobController,
    getJobsController,
    getJobByIdController,
    updateJobController,
    deleteJobController,
    getApplicantsForJobController,
    getMyJobsController
}