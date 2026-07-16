import { Link, useNavigate } from "react-router-dom";
import "../style/Navbar.css"

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">Home</Link>
            <div className="nav-links">
            {user?.role === "student" && (
                <>
                    <Link to="/studentDashboard">Dashboard</Link>
                    <Link to="/profile">Profile</Link>
                </>
            )}

            {user?.role === "recruiter" && (
                <>
                    <Link to="/recruiterDashboard">Dashboard</Link>
                    <Link to="/postjob">Post Job</Link>
                    <Link to="/profile">Profile</Link>
                </>
            )}

            {user && (
                <button onClick={logout}>
                    Logout
                </button>
            )}
            </div>
        </nav>
    );
};

export default Navbar;