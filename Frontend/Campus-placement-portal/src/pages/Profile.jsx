import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { uploadResume, getProfile, analyzeResume } from "../services/profileService"
import "../style/Profile.css" 

const Profile = () => {
    const navigate = useNavigate();
    const [resume, setResume] = useState(null);
    const [profile, setProfile] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data);
            const storedUser = JSON.parse(localStorage.getItem("user")) || {};
            localStorage.setItem("user", JSON.stringify({ ...storedUser, ...res.data }));
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    const handleResumeUpload = async () => {
        if(!resume){
            alert("Select a PDF first");
            return;
        }
        const formData = new FormData();
        formData.append("resume", resume);
        try{
            const res = await uploadResume(formData);
            alert(res.data.message);
            if (res.data?.resume) {
                setProfile((prev) => ({ ...prev, resume: res.data.resume }));
                const storedUser = JSON.parse(localStorage.getItem("user")) || {};
                localStorage.setItem("user", JSON.stringify({ ...storedUser, resume: res.data.resume }));
            }
        } catch (err) {
            console.error(err);
            console.error(err.response);
            console.error(err.response?.data);
            alert(err.response?.data?.message || "Upload Failed");
        }
    }

    const handleAnalyze = async () => {
        try {
            setLoading(true);
            const res = await analyzeResume();
            setAnalysis(res.data.analysis);
        } catch (err) {
            alert(err.response?.data?.message || "Analysis failed");
        } finally {
            setLoading(false);
        }
    }

    const user = JSON.parse(localStorage.getItem("user")) || {};
    console.log(profile?.resume);

    return (
        <div className="profile-container">
            {user?.role === "student" && (
                <>
                    <div className="profile-card">
                        <h1>Welcome {profile?.name}</h1>
                        <p>Upload your latest resume and get AI-powered feedback.</p>

                        <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setResume(e.target.files[0])}
                        />
                        <button className="upload-btn" onClick={handleResumeUpload}>
                            Upload Resume
                        </button>

                        {profile?.resume && (
                            <div className="resume-success">
                                <p style={{ color: "green", fontWeight: "600", marginBottom: "10px" }}>
                                    ✓ Resume uploaded successfully
                                </p>
                                <a
                                    href="https://campus-placement-portal-t5ky.onrender.com/api/profile/viewResume"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="resume-link"
                                >
                                    View Resume
                                </a>
                            </div>
                        )}
                    </div>

                    <div className="profile-card">
                        <h2>AI Resume Analyzer</h2>
                        <button className="ai-btn" onClick={handleAnalyze}>
                            Analyze Resume
                        </button>
                        {loading && (
                            <div className="loading-state">
                                <h3>Analyzing Resume...</h3>
                                <p>This may take a few seconds.</p>
                            </div>
                        )}
                    </div>

                    {analysis && (
                        <div className="score-card">
                            <h2>Resume Score</h2>
                            <h1>{analysis?.score}/100</h1>
                            <div className="progress">
                                <div className="progress-fill" style={{ width: `${analysis.score}%` }}></div>
                            </div>

                            <h2>Technical Skills</h2>
                            <div className="skill-container">
                                {analysis?.technicalSkills?.map((skill, index) => (
                                    <span className="skill" key={index}>{skill}</span>
                                ))}
                            </div>

                            <h2>Missing Skills</h2>
                            <div className="skill-container">
                                {analysis?.missingSkills?.map((skill, index) => (
                                    <span className="skill" key={index}>{skill}</span>
                                ))}
                            </div>

                            <h2>Strengths</h2>
                            <div className="skill-container">
                                {analysis?.strengths?.map((item, index) => (
                                    <div className="list-card" key={index}>{item}</div>
                                ))}
                            </div>

                            <h2>Weaknesses</h2>
                            <div className="skill-container">
                                {analysis?.weaknesses?.map((item, index) => (
                                    <div className="list-card" key={index}>{item}</div>
                                ))}
                            </div>

                            <h2>Suggestions</h2>
                            <div className="skill-container">
                                {analysis?.suggestions?.map((item, index) => (
                                    <div className="list-card" key={index}>{item}</div>
                                ))}
                            </div>

                            <h2>Suitable Job Roles</h2>
                            <div className="skill-container">
                                {analysis?.jobRoles?.map((item, index) => (
                                    <span className="skill" key={index}>{item}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
            {user?.role === "recruiter" && (
                <div className="profile-card">
                    <h2>Recruiter Profile</h2>
                    <p><strong>Name:</strong> {profile?.name}</p>
                    <p><strong>Email:</strong> {profile?.email}</p>
                    <p><strong>Role:</strong> Recruiter</p>
                    <p>Welcome! You can manage job postings and review applicants from your dashboard.</p>
                </div>
            )}
        </div>
    )
}

export default Profile