import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {login} from "../services/authService"
import "../style/Login.css";
import "../style/Global.css"



const Login = ()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await login({
            email, password
        })
        alert(response.data.message);
        const user = response.data?.user;
        if (user) {
            const normalizedRole = user.role?.toLowerCase();
            user.role = normalizedRole;
            localStorage.setItem("user", JSON.stringify(user));
        }
        const role = user?.role;
        if(role === 'student'){
            navigate("/studentDashboard");
        } else if(role === 'recruiter'){
            navigate("/recruiterDashboard");
        } else {
            navigate("/");
        }
    }catch(err){
         console.log(err);
    console.log(err.response);
    console.log(err.response?.data);
        alert(err.response?.data?.message || "login failed")
    }
}

    return(
        <div className="login-container">
            <div className="login-header">
                <h1>Campus Placement Portal</h1>
                <p>Welcome Back 👋</p>
            </div>

            <div className="login-card">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="login-btn" type="submit">Login</button>
                </form>

                <p className="register-text">
                    Don't have an account?
                    <button type="button" onClick={() => navigate("/register")}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    )
}



export default Login;