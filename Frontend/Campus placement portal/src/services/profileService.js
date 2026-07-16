import api from "./api";

export const getProfile = () => {
    return api.get("/profile/getprofile");
};

export const uploadResume = (formData) => {
    return api.post("/profile/uploadResume", formData);
};

export const analyzeResume = () => {
    return api.get("/profile/analyze-Resume");
};