const mongoose =  require('mongoose');

const useSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    skills: {
        type: [String]
    },
    phone: {
        type: String
    }, 
    cgpa: {
        type: Number
    },
    branch: {
        type: String
    },
    resume: {
        type: String,
        default: ""
    }
})

const userModel = mongoose.model('User', useSchema);
module.exports = userModel;