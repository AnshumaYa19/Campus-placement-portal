import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {getJobs} from "../services/jobService"
import {applyJob} from "../services/applicationService"
import "../style/StudentDashboard.css";
import "../style/Dashboard.css"


const StudentDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchJobs = async () => {
        const res = await getJobs();
        setJobs(res.data);
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleApply = async (jobId) => {
        try {
            const res = await applyJob(jobId);
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Failed to apply");
        }
    }

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <div>
                    <h1 style={{color: "white"}}>Welcome {user?.name}</h1>
                    <p style={{color: "white"}}>Find your next opportunity.</p>
                </div>
                <button className='top-btn' onClick={() => navigate("/myApplications")}>
                    My Applications
                </button>
            </div>

            <div className="search-section">
                <input
                    className="search-box"
                    type="text"
                    placeholder="Search by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="jobs-section">
                <h2>Available Jobs ({filteredJobs.length})</h2>
                {filteredJobs.length === 0 ? (
                    <div className="no-jobs">
                        <p>No Jobs Available</p>
                    </div>
                ) : (
                    <div className="jobs-grid">
                        {filteredJobs.map((job) => (
                            <div className='job-card' key={job._id}>
                                <div className="job-header">
                                    <h2>{job.title}</h2>
                                    <p className="company">{job.company}</p>
                                </div>

                                <p className="job-description">{job.description}</p>

                                <div className="job-details">
                                    <p><b>Location:</b> {job.location}</p>
                                    <p><b>Package:</b> {job.salary}</p>
                                </div>

                                <div className="skills-section">
                                    <p className="skills-label"><b>Required Skills:</b></p>
                                    <div className='skill-container'>
                                        {job.requiredSkills.map((skill, index) => (
                                            <span className='skill' key={index}>{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="deadline-section">
                                    <p><b>Deadline:</b> {new Date(job.deadline).toLocaleDateString()}</p>
                                </div>

                                <button className='apply-btn' onClick={() => handleApply(job._id)}>
                                    Apply Now
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}


export default StudentDashboard