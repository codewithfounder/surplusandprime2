import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email === "admin@gmail.com" && formData.password === "123456") {
            localStorage.setItem("token", "dummy_token");

            const redirectPath = location.state?.from || "/";
            navigate(redirectPath);
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-image" stype={{display: "flex", justifyContent: 'center'}}>
                    <img src="./images/logo.jpeg" alt="Login" style={{width: '30rem', }}/>
                </div>
                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to continue</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group password-group">
                        <label>Password</label>
                        <input className="password-wrapper"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <span
                            className="eye-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <img src='./images/show.png' /> : <img src='./images/hide.png' />}
                        </span>
                    </div>

                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                <p className="demo-text">
                    {/* Demo: admin@gmail.com / 123456 */}
                    <p className="register-text">
                        Don’t have an account?{" "}
                        <Link to="/register" className="register-link">
                            Register
                        </Link>
                    </p>
                </p>
            </div>
        </div>
    );
}

export default Login;