import React, { useRef } from "react";

const EmailVerification = ({ formData, setFormData, errors, handleSendOTP }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // only numbers

    if (!value) return;

    let newOtp = formData.otp.split("");
    newOtp[index] = value;
    setFormData({ ...formData, otp: newOtp.join("") });

    // Move to next input
    if (index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="email-verification">
      <p className="text-center">
        Enter the OTP sent to <strong>{formData.email || "your email"}</strong>
      </p>

      <div className="otp-container">
        {[0, 1, 2, 3].map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="otp-input"
            value={formData.otp[index] || ""}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
          />
        ))}
      </div>

      {errors.otp && <p className="error-text">{errors.otp}</p>}

      <button type="button" onClick={handleSendOTP}>
        Send OTP
      </button>
    </div>
  );
};

export default EmailVerification;