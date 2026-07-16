import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {register } from '../services/authService';
import "../style/Register.css"


const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await register({
                name, email, password, role
            })
            alert(response.data.message);
            navigate("/");
        } catch (err){
            alert(err.response?.data?.message || "Registration Failed")
        }
    }

    return (
        <div className='register-container'>
            <div className='register-card'>
                <div className='register-header'>
                    <h1>Campus Placement Portal</h1>
                    <p>Create your account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    <input type='text' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type='password' placeholder='Create Password' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value='student'>Student</option>
                        <option value='recruiter'>Recruiter</option>
                    </select>

                    <button className='register-btn' type='submit'>Register</button>

                    <p className='login-link'>
                        Already have an account?
                        <button type='button' onClick={() => navigate('/')}>Login</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register