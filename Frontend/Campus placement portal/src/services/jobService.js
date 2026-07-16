import api from "./api";

export const createJob = (data) => {
    return api.post("/job/createjob", data);
};

export const getJobs = () => {
    return api.get("/job/getjobs");
};

export const getJobById = (id) => {
    return api.get(`/job/getjob/${id}`)
}

export const updateJob = (id, data) => {
    return api.put(`/job/updatejob/${id}`, data)
}

export const deleteJob = (id) => {
    return api.delete(`/job/deletejob/${id}`);
};

export const getApplicants = (jobId) => {
    return api.get(`/job/getapplicants/${jobId}/applicants`)
}

export const getMyJobs = () => {
    return api.get("/job/myjobs");
};