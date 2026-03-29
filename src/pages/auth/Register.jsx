import React, { useState } from "react";
import BasicDetails from "../../components/auth/register/BasicDetails";
import EmailVerification from "../../components/auth/register/EmailVerification";
import ContactInfo from "../../components/auth/register/ContactInfo";
import Categories from "../../components/auth/register/Categories";
import "./style.css";

const Register = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        fullName: "",
        memberType: "Both Seller & Buyer",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",

        // Contact Info fields
        entityType: "company",
        industry: "",
        company: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        state: "",
        phone: "",
        ext: "",
        website: "",

        categories: [],
        region: "",
    });

    const steps = [
        "Basic Details",
        "Email Verification",
        "Contact Info",
        "Categories",
        "Regions",
    ];

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // remove error on typing
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        let updated = [...formData.categories];
        if (checked) updated.push(value);
        else updated = updated.filter((item) => item !== value);
        setFormData({ ...formData, categories: updated });
        if (updated.length > 0) setErrors({ ...errors, categories: "" });
    };

    // Validate current step
    const validateStep = () => {
        let newErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
            if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            if (!formData.password.trim()) newErrors.password = "Password is required";
            if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
            else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        }

        if (step === 2 && !formData.otp.trim()) newErrors.otp = "OTP is required";

        if (step === 3) {
            if (!formData.industry) newErrors.industry = "Industry is required";
            if (!formData.company.trim()) newErrors.company = "Company is required";
            if (!formData.address.trim()) newErrors.address = "Address is required";
            if (!formData.city.trim()) newErrors.city = "City is required";
            if (!formData.zip.trim()) newErrors.zip = "Zip Code is required";
            if (!formData.country) newErrors.country = "Country is required";
            if (!formData.state) newErrors.state = "State is required";
        }

        if (step === 4 && formData.categories.length === 0) newErrors.categories = "Select at least one category";

        if (step === 5 && !formData.region) newErrors.region = "Select a region";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateStep()) return;
        console.log("Final Data:", formData);
        alert("Account Created Successfully!");
    };

    // Send OTP
    const handleSendOTP = () => {
        if (!formData.email.trim()) {
            setErrors({ ...errors, email: "Enter email first" });
            return;
        }
        // Call backend API to send OTP
        console.log("OTP sent to:", formData.email);
        alert(`OTP sent to ${formData.email}`);
    };

    return (
        <div className="container">
            <div>
                <p>$5.2B Global Marketplace for Asset Recovery & Surplus Inventory</p>
            </div>

            {/* Stepper */}
            <div className="stepper">
                {steps.map((label, index) => (
                    <div key={index} className={`step ${step === index + 1 ? "active" : ""}`}>
                        {index + 1}. {label}
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="form-box">
                {step === 1 && (
                    <BasicDetails
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                    />
                )}

                {step === 2 && (
                    <EmailVerification
                        formData={formData}
                        handleChange={handleChange}
                        setFormData={setFormData}
                        errors={errors}
                        handleSendOTP={handleSendOTP}
                    />
                )}

                {step === 3 && (
                    <ContactInfo
                        formData={formData}
                        handleChange={handleChange}
                        errors={errors}
                    />
                )}

                {step === 4 && (
                    <Categories
                        formData={formData}
                        setFormData={setFormData}
                        errors={errors}
                    />
                )}

                {step === 5 && (
                    <>
                        <select
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className={errors.region ? "error" : ""}
                        >
                            <option value="">Select Region</option>
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                        </select>
                        {errors.region && <p className="error-text">{errors.region}</p>}
                    </>
                )}
            </div>

            {/* Buttons */}
            <div className="buttons">
                {step > 1 && <button onClick={prevStep}>Previous</button>}

                {step < 5 ? (
                    <button
                        onClick={() => {
                            if (validateStep()) nextStep();
                        }}
                    >
                        Next
                    </button>
                ) : (
                    <button onClick={handleSubmit}>Submit</button>
                )}
            </div>
        </div>
    );
};

export default Register;