import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {updateJob, getJobById, deleteJob, getMyJobs} from "../services/jobService"
import "../style/Dashboard.css"
import "../style/RecruiterDashboard.css"

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async ()=> {
        const res = await getMyJobs();
        setJobs(res.data);
    }
    useEffect(() => {
        fetchJobs();
    }, []);
    const handleDelete = async (id) => {
        try{
            const res = await deleteJob(id);
            alert(res.data.message);
            fetchJobs()
        }catch(err) {
            alert(err.response?.data?.message || "Delete Failed")
        }
    }
    const user = JSON.parse(localStorage.getItem("user"));
    return (
        <div className='dashboard-container'>
            <div className='dashboard-header'>
                <div>
                    <h3>Welcome {user?.name}</h3>
                    <p style={{color: "white"}}>Manage your posted jobs</p>
                </div>
                <div>
                    <button onClick={() => navigate("/postjob")}>+ Post New Job</button>
                </div>
            </div>

            <div className='stats'>
                <div className='stat-card'>
                    <h2>{jobs.length}</h2>
                    <p>Active Jobs</p>
                </div>
                <div className="stat-card">
                <h2>{jobs.length}</h2>
                <p>Total Jobs</p>
                </div>
            </div>

            <h2 className="section-title">My Jobs</h2>
            {jobs.length === 0 ? (
                <p>No jobs posted yet.</p>
            ) : (
                jobs.map(job => (
                    <div className='job-card' key={job._id}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <p>{job.salary}</p>
                        <p>{job.requiredSkills}</p>
                        <p>Applicants: {job.applicantCount}</p>

                        <div className='job-buttons'>
                            <button onClick={() => navigate(`/postjob/${job._id}`)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(job._id)}>
                                Delete
                            </button>
                            <button onClick={() => navigate(`/applicants/${job._id}`)}>
                                Applicants
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default RecruiterDashboard