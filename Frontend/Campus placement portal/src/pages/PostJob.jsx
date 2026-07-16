import {createJob, getJobById, updateJob} from '../services/jobService'
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import "../style/PostJob.css"

const PostJob = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState("");
    const [requiredSkills, setRequiredSkills] = useState("");
    const [deadline, setDeadline] = useState("");
    const fetchJobById = async () => {
        try{
            const res = await getJobById(id);
            setTitle(res.data.title);
            setCompany(res.data.company);
            setDescription(res.data.description);
            setLocation(res.data.location);
            setSalary(res.data.package || "");
            setRequiredSkills(res.data.requiredSkills);
            setDeadline(res.data.deadline.split("T")[0]);
        } catch (err){
            alert("Failed to load job")
        }
    }
    useEffect(() => {
        if(id){
            fetchJobById()
        }
    }, [id])
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (id) {
                response = await updateJob(id, {
                    title,
                    company,
                    description,
                    location,
                    salary,
                    requiredSkills,
                    deadline
                });
            } else {
                response = await createJob({
                    title,
                    company,
                    description,
                    location,
                    salary,
                    requiredSkills,
                    deadline
                });
            }

            alert(response.data.message);
            navigate("/recruiterDashboard");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create job");
        }
    };

    return (
        <div className='postjob-container'>
            <div className='postjob-card'>
                <h1>
                    {id ? "Edit Job" : "Post a New Job"}
                </h1>
                <p>Fill in the job details below</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Job Title</label>
                        <input
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Company Name</label>
                        <input
                            type='text'
                            placeholder='Company'
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Job Description</label>
                        <input
                            type='text'
                            placeholder='Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Location</label>
                        <input
                            type='text'
                            placeholder='Location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Package</label>
                        <input
                            type='text'
                            placeholder='Package'
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Required Skills</label>
                        <p style={{ fontSize: "13px", color: "#777" }}>
                            Separate skills with commas.
                            Example: Java, React, Node.js
                        </p>
                        <input
                            type='text'
                            placeholder='Required Skills'
                            value={requiredSkills}
                            onChange={(e) => setRequiredSkills(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>Deadline</label>
                        <input
                            type='date'
                            placeholder='Deadline'
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </div>

                    <button className='submit-btn' type='submit'>
                        {id ? "Update Job" : "Create Job"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PostJob