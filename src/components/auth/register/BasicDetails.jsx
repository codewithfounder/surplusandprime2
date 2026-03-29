import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BasicDetails = ({
  formData,
  handleChange,
  errors,
  setErrors,
  handleSubmitFinal,
  setFormData
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryList, setCountryList] = useState([]);

  // Fetch countries
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=cca2,name,flags,idd")
      .then((res) => res.json())
      .then((data) => {
        const countries = data
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode:
              c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : ""),
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountryList(countries);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle country change
  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = countryList.find(
      (c) => c.code === selectedCode
    );

    handleChange(e);

    if (selectedCountry) {
      setFormData((prev) => ({
        ...prev,
        country: selectedCode,
        mobile: selectedCountry.dialCode,
      }));
    }
  };

  const validateMobile = () => {
    const selected = countryList.find(
      (c) => c.code === formData.country
    );
    if (!selected) return false;

    const regex = new RegExp(
      `^\\${selected.dialCode}[0-9]{6,14}$`
    );
    return regex.test(formData.mobile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateMobile()) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Invalid mobile for selected country",
      }));
      return;
    }

    handleSubmitFinal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="basic-details">

        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>Full Name <span>*</span></label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && <p className="error-text">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label>Member Type <span>*</span></label>
            <select
              name="memberType"
              value={formData.memberType}
              onChange={handleChange}
            >
              <option value="Both Seller & Buyer">Both Seller & Buyer</option>
              <option value="Only Seller">Only Seller</option>
              <option value="Only Buyer">Only Buyer</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>Mobile Number <span>*</span></label>

            <div className={`mobile-input-wrapper ${errors.mobile ? "error-wrapper" : ""}`}>
              <select
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className="country-selector-button"
                style={{width: '10rem'}}
              >
                <option value="">Code</option>
                {countryList.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="mobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>

            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
          </div>

          <div className="form-group">
            <label>Email <span>*</span></label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>Password <span>*</span></label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              <span className="eye" onClick={() => setShowPassword(!showPassword)}>
                <img src={showPassword ? "./images/show.png" : "./images/hide.png"} alt="toggle" />
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label>Confirm Password <span>*</span></label>
            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              <span className="eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                <img src={showConfirmPassword ? "./images/show.png" : "./images/hide.png"} alt="toggle" />
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <p className="terms">
          By clicking SUBMIT, you agree to our <span>Terms and Conditions</span>
        </p>

        <p className="login">
          Existing Account? <span><Link to="/login">Login</Link></span>
        </p>

      </div> 
    </form>
  );
};

export default BasicDetails;