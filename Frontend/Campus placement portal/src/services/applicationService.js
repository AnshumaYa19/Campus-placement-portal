import api from "./api";

export const applyJob = (jobId) => {
    return api.post(`/application/createapplication/${jobId}`);
};

export const getApplications = () => {
    return api.get("/application/getapplications");
};

export const updateApplicationStatus = (applicationId, status) => {
    return api.put(`/application/updateapplication/${applicationId}/status`, { status });
};