import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("profile");
  const [isOpen, setIsOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // 🔐 Check login
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.login) {
      window.location.href = "/login";
    }
  }, []);

  // 👤 Load user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setEditData(parsed);
    }
  }, []);

  // 🔄 Sync user across tabs
  useEffect(() => {
    const syncUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setEditData(parsed);
      }
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // ✅ Load products
  useEffect(() => {
    const storedProducts = localStorage.getItem("enquiryProduct"); // ✅ make sure key matches
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleProductClick = (product) => {
    navigate(`/product-details/${product.id}`, { state: product });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setUser(editData);
    localStorage.setItem("user", JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setEditData(storedUser);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (active) {
      case "profile":
        return (
          <div className="dashboard-content-box">
            <h2>My Profile</h2>

            {!isEditing ? (
              <>
                <p><strong>Name:</strong> {user?.fullName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Mobile:</strong> {user?.mobile}</p>
                <p><strong>Company:</strong> {user?.company}</p>
                <p><strong>Industry:</strong> {user?.industry}</p>
                <p><strong>Region:</strong> {user?.region}</p>

                <button
                  className="dashboard-edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️ Edit Profile
                </button>
              </>
            ) : (
              <>
                {["fullName", "email", "mobile", "company", "industry", "region"].map((field) => (
                  <div className="dashboard-form-group" key={field}>
                    <label>{field}</label>
                    <input
                      name={field}
                      value={editData[field] || ""}
                      onChange={handleEditChange}
                    />
                  </div>
                ))}

                <div className="dashboard-edit-actions">
                  <button className="dashboard-save-btn" onClick={handleSave}>
                    💾 Save
                  </button>
                  <button className="dashboard-cancel-btn" onClick={handleCancel}>
                    ❌ Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case "buy":
        return (
          <div className="dashboard-content-box">
            <h2>Enquiry Products</h2>

            {products.length === 0 ? (
              <p>No products added yet.</p>
            ) : (
              <div className="product-card-container">
                {products.map((item) => (
                  <div
                    className="user-product-card"
                    key={item.id}
                    onClick={() => handleProductClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        item.images && item.images.length > 0
                          ? item.images[0]
                          : "https://via.placeholder.com/300x180?text=No+Image"
                      }
                      alt={item.name}
                      className="product-card-image"
                    />

                    <div className="product-card-body">
                      <h3>{item.name}</h3>
                      <p><strong>Seller:</strong> {item.seller}</p>
                      <p><strong>Industry:</strong> {item.sellerIndustry}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar logo="../images/surplus.png" />

      <div className="dashboard-mobile-header">
        <button className="dashboard-menu-btn" onClick={() => setIsOpen(true)}>
          ☰
        </button>
        <h2>Dashboard</h2>
      </div>

      <div className="dashboard-layout">
        <div className={`dashboard-sidebar ${isOpen ? "dashboard-open" : ""}`}>
          <button className="dashboard-close-btn" onClick={() => setIsOpen(false)}>
            ✖
          </button>

          <h3>Dashboard</h3>

          <ul>
            <li onClick={() => { setActive("profile"); setIsOpen(false); }}>
              👤 Profile
            </li>

            <li onClick={() => { setActive("buy"); setIsOpen(false); }}>
              🛒 Enquiry Product
            </li>

            <button
              className="dashboard-logout-btn"
              onClick={() => {
                const storedUser = JSON.parse(localStorage.getItem("user"));
                if (storedUser) {
                  storedUser.login = false;
                  localStorage.setItem("user", JSON.stringify(storedUser));
                }
                setUser(null);
                window.location.href = "/login";
              }}
            >
              🔒 Logout
            </button>
          </ul>
        </div>

        {isOpen && <div className="dashboard-overlay" onClick={() => setIsOpen(false)}></div>}

        <div className="dashboard-content">
          <h1>Welcome to Dashboard</h1>
          {user ? renderContent() : <p>Please register first.</p>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;