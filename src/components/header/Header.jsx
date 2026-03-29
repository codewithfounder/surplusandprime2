import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ logo }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);


    return (
        <>
            {/* 🔷 TOPBAR */}
            <div className="topbar">
                <div className="topbar-left">
                    <span><i className="fa fa-map-marker-alt"></i> Location: B-113, Sector-64, Noida</span>
                    <span><i className="fa fa-envelope"></i> Email: info@shivglobeacademy.com</span>
                    <span><i className="fa fa-clock"></i> Working Hours: 10:00 am - 7:00 pm</span>
                </div>

                <div className="topbar-right">
                    <a href="#">Careers</a>
                    <a href="#">FAQs</a>
                    <div className="social-icons">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-twitter"></i>
                        <i className="fab fa-youtube"></i>
                    </div>
                </div>
            </div>

            {/* 🔷 NAVBAR */}
            <div className="navbar">
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
                        <span>Category ▾</span>

                        <ul className={`submenu ${activeDropdown === "category" ? "show" : ""}`}>
                            <li><Link to="/category/web-dev">Web Development</Link></li>
                            <li><Link to="/category/app-dev">App Development</Link></li>
                            <li><Link to="/category/data-science">Data Science</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/contact">Contact Us</Link></li>

                    <li className="mobile-extra">   {/* ✅ use li instead */}
                        <Link to="/login">
                            <button className="pickup-btn">Login</button>
                        </Link>

                        <div className="contact-box">
                            <i className="fa fa-phone phone-icon"></i>
                            <div>
                                <p>Need assistance?</p>
                                <h4>+91 9211018618</h4>
                            </div>
                        </div>
                    </li>
                </ul>

                {/* DESKTOP RIGHT */}
                <div className="nav-right desktop-only">
                    <i className="fa fa-search search-icon"></i>

                    <Link to="/login">
                        <button className="pickup-btn">Login</button>
                    </Link>

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