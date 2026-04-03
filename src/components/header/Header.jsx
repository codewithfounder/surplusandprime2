import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Header({ logo }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setLoggedIn(storedUser?.login || false);
    }, []);

    const handleLogout = () => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            storedUser.login = false;
            localStorage.setItem("user", JSON.stringify(storedUser));
        }
        setLoggedIn(false);
        navigate("/login");
    };

    return (
        <>
            {/* 🔷 TOPBAR */}
            <div className="topbar">
                <div className="topbar-left">
                    <span><i className="fa fa-map-marker-alt"></i> Location: FDR K-2058, Compass Building, Al Shohada Rd, Al Hamra Industrial Zone, Ras Al Khaimah, UAE</span>
                    <span><i className="fa fa-envelope"></i> Email: info@surplusandprime.com</span>
                    <span><i className="fa fa-clock"></i> Working Hours: Monday to Saturday - 9:00 AM to 5PM</span>
                </div>

                {/* <div className="topbar-right">
                    <a href="#">Careers</a>
                    <a href="#">FAQs</a>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div> */}
            </div>

            {/* 🔷 NAVBAR */}
            <div className="navbar" style={{ zIndex: '1' }}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>

                {/* 🍔 HAMBURGER */}
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className="fa fa-bars"></i>
                </div>

                {/* NAV LINKS */}
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/shop">Shop</Link></li>
                    <li
                        className="dropdown"
                        onClick={() =>
                            setActiveDropdown(activeDropdown === "category" ? null : "category")
                        }
                    >
                        <span>Industry ▾</span>
                        <ul className={`submenu ${activeDropdown === "category" ? "show" : ""}`}>
                            <li><Link to="/category/1">Chemical & Petrochemicals</Link> </li>
                            <li><Link to="/category/2">Commercial Equipment</Link></li>
                            <li><Link to="/category/3">Computer & Peripherals</Link></li>
                            <li><Link to="/category/4">Electrical Utilities & Downstream</Link></li>
                            <li><Link to="/category/5">Marine</Link></li>
                            <li><Link to="/category/6">Oil & Gas</Link></li>
                            <li><Link to="/category/7">Solar</Link></li>
                            <li><Link to="/category/8">Transportation/Vehicles/Mobile Assets</Link></li>
                            <li><Link to="/category/9">Heavy Equipment</Link></li>
                            <li><Link to="/category/10">Building Materials</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/contact">Contact Us</Link></li>

                    {/* Mobile Extra Links */}
                    <li className="mobile-extra">
                        {loggedIn ? (
                            <Link to="/dashboard">
                                <button className="pickup-btn">Dashboard</button>
                            </Link>
                        ) : (
                            <Link to="/login">
                                <button className="pickup-btn">Login</button>
                            </Link>
                        )}

                        <div className="contact-box">
                            <i className="fa fa-phone phone-icon"></i>
                            <div>
                                <p>Need assistance?</p>
                                <h4>+91 9211018618</h4>
                            </div>
                        </div>
                    </li>
                </ul>

                {/* Desktop Right */}
                <div className="nav-right desktop-only">
                    <i className="fa fa-search search-icon"></i>

                    {loggedIn ? (
                        <Link to="/dashboard">
                                <button className="pickup-btn">Dashboard</button>
                            </Link>
                    ) : (
                        <Link to="/login">
                            <button className="pickup-btn">Login</button>
                        </Link>
                    )}

                    <div className="contact-box">
                        <i className="fa fa-phone phone-icon"></i>
                        <div>
                            <p>Need assistance?</p>
                            <h4>+91 9211018618</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;