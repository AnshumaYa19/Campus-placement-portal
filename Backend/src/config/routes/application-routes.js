const express = require('express');
const mongoose = require('mongoose');
const applicationRouter = express.Router();
const applicationController = require('../controllers/application-controller');
const authUser = require('../../middlewares/auth-middleware');


applicationRouter.post('/createapplication/:jobId', authUser, applicationController.createApplicationController);

applicationRouter.get('/getapplications', authUser, applicationController.getApplicationController);

applicationRouter.put('/updateapplication/:applicationId/status', authUser, applicationController.updateApplicationStatusController);

module.exports = applicationRouter;