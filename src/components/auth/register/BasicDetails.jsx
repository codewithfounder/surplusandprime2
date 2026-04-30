import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { Link } from "react-router-dom";

const BasicDetails = ({
  formData,
  handleChange,
  errors,
  setErrors,
  handleSubmitFinal,
  setFormData,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [isMobileDisabled, setIsMobileDisabled] = useState(true);
  const [mobileValid, setMobileValid] = useState(false);
  const mobileInputRef = useRef(null);

  // Fetch countries on mount
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=cca2,name,flags,idd")
      .then((res) => res.json())
      .then((data) => {
        const countries = data
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode: c.idd.root
              ? c.idd.root + (c.idd.suffixes ? c.idd.suffixes[0] : "")
              : "",
          }))
          .filter((c) => c.dialCode) // keep only countries with dial code
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountryList(countries);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle country code change
  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    setFormData((prev) => ({
      ...prev,
      countryCode: selectedCode,
      mobile: "", // Clear mobile number when country changes
    }));
    setErrors((prev) => ({ ...prev, mobile: "" })); // remove error
    setMobileValid(false);
    
    // Enable mobile input when country is selected
    if (selectedCode) {
      setIsMobileDisabled(false);
      setTimeout(() => {
        if (mobileInputRef.current) {
          mobileInputRef.current.focus();
        }
      }, 100);
    } else {
      setIsMobileDisabled(true);
    }
  };

  // Get country code without plus for validation
  const getCountryCodeWithoutPlus = (dialCode) => {
    return dialCode.replace('+', '');
  };

  // Validate mobile number with country code
  const validateMobile = (mobileNumber, countryCode) => {
    if (!countryCode) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: "Please select a country code first" 
      }));
      setMobileValid(false);
      return false;
    }

    if (!mobileNumber) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: "Mobile number is required" 
      }));
      setMobileValid(false);
      return false;
    }

    // Remove all non-digits from mobile number
    const cleanMobile = mobileNumber.replace(/\D/g, "");
    
    if (cleanMobile.length === 0) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: "Please enter a valid mobile number" 
      }));
      setMobileValid(false);
      return false;
    }

    // Get the country code without plus
    const countryCodeWithoutPlus = getCountryCodeWithoutPlus(countryCode);
    
    // Check if mobile number starts with the country code
    let finalMobileNumber = cleanMobile;
    let isCountryCodeInNumber = false;
    
    // Check if the user entered the country code in the mobile field
    if (cleanMobile.startsWith(countryCodeWithoutPlus)) {
      isCountryCodeInNumber = true;
      // Remove the country code from the mobile number
      finalMobileNumber = cleanMobile.substring(countryCodeWithoutPlus.length);
    }
    
    // Validate mobile number length based on country
    let isValidLength = false;
    let minLength = 7;
    let maxLength = 15;
    
    // Country-specific length validation
    const countryCodeLower = countryCodeWithoutPlus;
    if (countryCodeLower === '1') { // USA/Canada
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeLower === '91') { // India
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeLower === '44') { // UK
      minLength = 10;
      maxLength = 10;
    } else if (countryCodeLower === '61') { // Australia
      minLength = 9;
      maxLength = 10;
    } else if (countryCodeLower === '86') { // China
      minLength = 11;
      maxLength = 11;
    } else {
      minLength = 7;
      maxLength = 15;
    }
    
    isValidLength = finalMobileNumber.length >= minLength && finalMobileNumber.length <= maxLength;
    
    if (!isValidLength) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: `Mobile number should be ${minLength} digits ${minLength !== maxLength ? `to ${maxLength}` : ''} (excluding country code). Current: ${finalMobileNumber.length} digits` 
      }));
      setMobileValid(false);
      return false;
    }
    
    // Check if the mobile number starts with 0 (common issue)
    if (finalMobileNumber.startsWith('0')) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: "Mobile number should not start with 0" 
      }));
      setMobileValid(false);
      return false;
    }
    
    // All validations passed
    setErrors((prev) => ({ ...prev, mobile: "" }));
    setMobileValid(true);
    
    // Update formData with cleaned mobile number (without country code if it was entered)
    if (isCountryCodeInNumber) {
      setFormData((prev) => ({
        ...prev,
        mobile: finalMobileNumber
      }));
    }
    
    return true;
  };

  // Handle mobile input change with real-time validation
  const handleMobileChange = (e) => {
    let value = e.target.value;
    
    // Remove spaces and special characters, keep only digits
    value = value.replace(/\s/g, "");
    
    // Update form data
    setFormData((prev) => ({
      ...prev,
      mobile: value,
    }));
    
    // Real-time validation
    if (formData.countryCode && value) {
      // Only show validation if both country code and mobile are present
      const cleanMobile = value.replace(/\D/g, "");
      const countryCodeWithoutPlus = getCountryCodeWithoutPlus(formData.countryCode);
      
      // Check if number length is appropriate
      let minLength = 7;
      if (countryCodeWithoutPlus === '1' || countryCodeWithoutPlus === '91' || countryCodeWithoutPlus === '44') {
        minLength = 10;
      }
      
      if (cleanMobile.length >= minLength) {
        validateMobile(value, formData.countryCode);
      } else if (errors.mobile) {
        setErrors((prev) => ({ ...prev, mobile: "" }));
        setMobileValid(false);
      }
    } else if (errors.mobile) {
      setErrors((prev) => ({ ...prev, mobile: "" }));
      setMobileValid(false);
    }
  };

  // Handle mobile blur for final validation
  const handleMobileBlur = () => {
    if (formData.mobile && formData.countryCode) {
      validateMobile(formData.mobile, formData.countryCode);
    } else if (!formData.countryCode && formData.mobile) {
      setErrors((prev) => ({ 
        ...prev, 
        mobile: "Please select a country code first" 
      }));
      setMobileValid(false);
    }
  };

  // Validate password
  const validatePassword = (password) => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 6 characters long" }));
      return false;
    }
    
    setErrors((prev) => ({ ...prev, password: "" }));
    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Please confirm your password" }));
      return false;
    }
    
    if (confirmPassword !== password) {
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return false;
    }
    
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    return true;
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (name === "password") {
      validatePassword(value);
      // Also re-validate confirm password if it exists
      if (formData.confirmPassword) {
        validateConfirmPassword(formData.confirmPassword, value);
      }
    } else if (name === "confirmPassword") {
      validateConfirmPassword(value, formData.password);
    }
  };

  // Form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    let isValid = true;

    if (!formData.fullName.trim()) {
      setErrors((prev) => ({ ...prev, fullName: "Full Name is required" }));
      isValid = false;
    }

    if (!formData.countryCode) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please select a country code",
      }));
      isValid = false;
    }

    if (!formData.mobile) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required",
      }));
      isValid = false;
    } else if (formData.countryCode) {
      const mobileIsValid = validateMobile(formData.mobile, formData.countryCode);
      if (!mobileIsValid) isValid = false;
    }

    if (!formData.email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
      isValid = false;
    }

    const passwordIsValid = validatePassword(formData.password);
    if (!passwordIsValid) isValid = false;

    const confirmPasswordIsValid = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (!confirmPasswordIsValid) isValid = false;

    if (!isValid) {
      return;
    }

    try{
       const res = await fetch(
        "http://localhost/virendra/SURPLUS/website/auth/register_step1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.status) {
        setFormData((prev) => ({
          ...prev,
          user_id: data.user_id,
        }));

        handleSubmitFinal(); // move to step 2
      } else {
        alert(data.message);
      }
    }catch(err){
      console.error(err);
    }

    // handleSubmitFinal(); // proceed to next step
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="basic-details">
        {/* Row 1 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Full Name <span>*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={() => {
                if (!formData.fullName.trim()) {
                  setErrors((prev) => ({ ...prev, fullName: "Full Name is required" }));
                }
              }}
              className={errors.fullName ? "error" : ""}
            />
            {errors.fullName && (
              <p className="error-text">{errors.fullName}</p>
            )}
          </div>

          <div className="form-group">
            <label>
              Member Type <span>*</span>
            </label>
            <select
              name="memberType"
              value={formData.memberType}
              onChange={handleChange}
            >
              <option value="">Select your member type</option>
              <option value="Only Buyer">Buyer</option>
            </select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Mobile Number <span>*</span>
            </label>
            <div
              className={`mobile-input-wrapper ${
                errors.mobile ? "error-wrapper" : ""
              }`}
            >
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleCountryChange}
                className="country-selector-button"
                style={{ width: "12rem" }}
              >
                <option value="">Select Country Code</option>
                {countryList.map((c) => (
                  <option key={c.code} value={c.dialCode}>
                    {c.name} ({c.dialCode})
                  </option>
                ))}
              </select>

              <input
                ref={mobileInputRef}
                type="tel"
                name="mobile"
                placeholder={isMobileDisabled ? "Select country code first" : "Enter mobile number"}
                value={formData.mobile}
                onChange={handleMobileChange}
                onBlur={handleMobileBlur}
                disabled={isMobileDisabled}
                className={errors.mobile ? "error" : ""}
                style={{
                  backgroundColor: isMobileDisabled ? "#f5f5f5" : "white",
                  cursor: isMobileDisabled ? "not-allowed" : "text"
                }}
              />
            </div>
            {errors.mobile && <p className="error-text">{errors.mobile}</p>}
            {mobileValid && !errors.mobile && formData.mobile && formData.countryCode && (
              <p className="success-text" style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                ✓ Valid mobile number for selected country
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Email <span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              onBlur={() => {
                if (!formData.email.trim()) {
                  setErrors((prev) => ({ ...prev, email: "Email is required" }));
                } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                  setErrors((prev) => ({ ...prev, email: "Email is invalid" }));
                }
              }}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
        </div>

        {/* Row 3 */}
        <div className="form-row">
          <div className="form-group">
            <label>
              Password <span>*</span>
            </label>
            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password (min. 6 characters)"
                value={formData.password}
                onChange={handlePasswordChange}
                onBlur={() => validatePassword(formData.password)}
                className={errors.password ? "error" : ""}
              />
              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? "./images/show.png" : "./images/hide.png"}
                  alt="toggle"
                />
              </span>
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}
            {formData.password && !errors.password && formData.password.length >= 6 && (
              <p className="success-text" style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                ✓ Password strength: Good
              </p>
            )}
          </div>

          <div className="form-group">
            <label>
              Confirm Password <span>*</span>
            </label>
            <div className="password-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handlePasswordChange}
                onBlur={() => validateConfirmPassword(formData.confirmPassword, formData.password)}
                className={errors.confirmPassword ? "error" : ""}
              />
              <span
                className="eye"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                <img
                  src={
                    showConfirmPassword ? "./images/show.png" : "./images/hide.png"
                  }
                  alt="toggle"
                />
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
            {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="success-text" style={{ color: "green", fontSize: "12px", marginTop: "5px" }}>
                ✓ Passwords match
              </p>
            )}

          </div>
        </div>
            {/* Submit */}
        <div style={{ marginTop: "20px" }}>
          <button type="submit" style={{width: '100%'}}>Next</button>
        </div>

        <p className="terms">
          By clicking NEXT, you agree to our <span>Terms and Conditions</span>
        </p>

        <p className="login">
          Existing Account? <span><Link to="/login">Login</Link></span>
        </p>
      </div>
    </form>
  );
};

export default BasicDetails;