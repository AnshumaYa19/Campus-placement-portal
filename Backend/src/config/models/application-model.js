const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    }, 
    status: {
        type: String,
        enum: ['applied', 'shortlisted', 'rejected', 'accepted'],
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
})

const applicationModel = mongoose.model('Application', applicationSchema);
module.exports = applicationModel; 