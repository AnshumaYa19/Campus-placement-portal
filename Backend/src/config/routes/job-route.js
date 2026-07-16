const express = require('express')
const authUser = require('../../middlewares/auth-middleware');
const jobController = require('../controllers/job-controller');
const jobRouter = express.Router();

jobRouter.post('/createjob', authUser, jobController.createJobController);

jobRouter.get('/getjobs' , authUser, jobController.getJobsController);

jobRouter.get('/getjob/:id' , authUser, jobController.getJobByIdController);

jobRouter.put('/updatejob/:id', authUser, jobController.updateJobController);

jobRouter.delete('/deletejob/:id', authUser, jobController.deleteJobController);

jobRouter.get('/getapplicants/:jobId/applicants', authUser, jobController.getApplicantsForJobController);

jobRouter.get('/myJobs', authUser, jobController.getMyJobsController)
module.exports = jobRouter;