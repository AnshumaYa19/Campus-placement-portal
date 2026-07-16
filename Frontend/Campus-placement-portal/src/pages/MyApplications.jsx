import { useEffect, useState } from "react";
import { getApplications } from "../services/applicationService";

const MyApplications = () => {

    const [applications, setApplications] = useState([]);

    const fetchApplications = async () => {
        try{
            const res = await getApplications();
            setApplications(res.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchApplications();
    },[]);

    return(
        <div className="myApplicants-container">
            <h1>My Applications</h1>
            <p>You have applied to {applications.length} job(s).</p>
            {applications.length===0?
                 <p>No Applications Yet</p>:applications.map((application)=>(
                    <div className="job-card" key={application._id}>
                        
                        <h3>{application.job.title}</h3>

                        <p>
                            <b>Company:</b> {application.job.company}
                        </p>

                        <p>
                            <b>Location:</b> {application.job.location}
                        </p>

                        <p>
                            <b>Status:</b> <span className={`status ${application.status}`}>{" "}{application.status}</span>
                        </p>

                    </div>
                ))
            }

        </div>
    )
}

export default MyApplications;