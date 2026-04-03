import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";

function Login() {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");

    // ✅ Handle input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(""); // clear error on typing
    };

    // ✅ Handle login
   const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
    ) {
        // Mark login true
        storedUser.login = true;
        localStorage.setItem("user", JSON.stringify(storedUser));

        navigate("/dashboard");
    } else {
        setError("Invalid email or password");
    }
};

    return (
        <div className="login-wrapper">
            <div className="login-card">

                <div className="login-image" style={{ display: "flex", justifyContent: 'center' }}>
                    <img src="./images/logo.jpeg" alt="Login" style={{ width: '30rem' }} />
                </div>

                <h2 className="login-title">Welcome Back 👋</h2>
                <p className="login-subtitle">Login to continue</p>

                {error && <div className="login-error">{error}</div>}

                <form onSubmit={handleSubmit}>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="input-group password-group">
                        <label>Password</label>

                        <div style={{ position: "relative" }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                style={{ width: "100%" }}
                            />

                            <span
                                className="eye-icon"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer"
                                }}
                            >
                                {showPassword
                                    ? <img src="./images/show.png" alt="show" />
                                    : <img src="./images/hide.png" alt="hide" />}
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <button type="submit" className="login-btn">
                        Login
                    </button>
                </form>

                {/* Register */}
                <p className="register-text">
                    Don’t have an account?{" "}
                    <Link to="/register" className="register-link">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;