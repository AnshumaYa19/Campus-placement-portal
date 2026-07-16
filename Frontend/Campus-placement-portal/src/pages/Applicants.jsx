import {getApplicants} from "../services/jobService"
import {useNavigate, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react'
import { updateApplicationStatus } from "../services/applicationService";
import "../style/Applicants.css"


const Applicants = () => {
    const { id: jobId } = useParams();
    const [applicants, setApplicants] = useState([]);
    const fetchApplicants = async () => {
        try{
            const res = await getApplicants(jobId);
            setApplicants(res.data);
        }catch (err){
            console.log(err);
        }
    }
    useEffect(() => {
        if (jobId) fetchApplicants();
    }, [jobId])
    const handleStatus = async (applicationId, status) => {
        try{
            const res = await updateApplicationStatus(applicationId,status);
            alert(res.data.message);
            fetchApplicants();
        }catch(err){
            alert(err.response?.data?.message ||"Failed to update status");
        }
    }
    return(
        <div>
            <h1>Applicants</h1>
            {applicants.length === 0?(
                <p>No Applicants Yet</p>
            ):(
                applicants.map((application) => (
                    <div className="applicant-card" key={application._id}>
                        <h3>{application.student.name}</h3>
                        <p>Email: {application.student.email}</p>
                        <p>Branch: {application.student.branch}</p>
                        <p>CGPA: {application.student.cgpa}</p>
                        <p>Status: {application.status}</p>
                        <div className="button-group">
                        <button onClick={() => handleStatus(application._id, "accepted")}>Accept</button>
                        <button onClick={() => handleStatus(application._id, "rejected")}>Reject</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Applicants