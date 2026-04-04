import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicDetails from "../../components/auth/register/BasicDetails";
import EmailVerification from "../../components/auth/register/EmailVerification";
import ContactInfo from "../../components/auth/register/ContactInfo";
import Categories from "../../components/auth/register/Categories";
import "./style.css";

const Register = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        memberType: "Buyer",
        countryCode: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
        otp: "",

        // Contact Info fields
        entityType: "company",
        industry: "",
        address: "",
        city: "",
        zip: "",
        country: "",
        state: "",
        phone: "",
        ext: "",
        website: "",

        categories: [],
        region: [], // ✅ FIXED (was "")
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
        setErrors({ ...errors, [name]: "" });
    };

    const handleCheckbox = (e) => {
        const { value, checked } = e.target;
        let updated = [...formData.categories];
        if (checked) updated.push(value);
        else updated = updated.filter((item) => item !== value);

        setFormData({ ...formData, categories: updated });

        if (updated.length > 0) {
            setErrors({ ...errors, categories: "" });
        }
    };

    // ✅ Validate current step
    const validateStep = () => {
        let newErrors = {};

        if (step === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
            if (!formData.mobile.trim()) newErrors.mobile = "Mobile is required";
            if (!formData.email.trim()) newErrors.email = "Email is required";
            if (!formData.password.trim()) newErrors.password = "Password is required";
            if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";
            else if (formData.password !== formData.confirmPassword)
                newErrors.confirmPassword = "Passwords do not match";
        }

        if (step === 2 && !formData.otp.trim()) {
            newErrors.otp = "OTP is required";
        }

        if (step === 3) {
            if (!formData.industry) newErrors.industry = "Industry is required";
            if (!formData.address.trim()) newErrors.address = "Address is required";
            if (!formData.city.trim()) newErrors.city = "City is required";
            if (!formData.zip.trim()) newErrors.zip = "Zip Code is required";
            if (!formData.country) newErrors.country = "Country is required";
            if (!formData.state) newErrors.state = "State is required";
        }

        if (step === 4 && formData.categories.length === 0) {
            newErrors.categories = "Select at least one category";
        }

        // ✅ FIXED validation for array
        if (step === 5 && formData.region.length === 0) {
            newErrors.region = "Select at least one region";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateStep()) return;

        const userId = Date.now();

        const userData = {
            ...formData,
            id: userId,
            login: true,
        };

        console.log("Final Data:", userData);

        localStorage.setItem("user", JSON.stringify(userData));

        alert("Account Created Successfully!");

        navigate("/dashboard");
    };

    // Send OTP
    const handleSendOTP = () => {
        if (!formData.email.trim()) {
            setErrors({ ...errors, email: "Enter email first" });
            return;
        }

        console.log("OTP sent to:", formData.email);
        alert(`OTP sent to ${formData.email}`);
    };

    return (
        <div className="container1">
            <div>
                <p className="top-cont">
                    Global Marketplace for Asset Recovery & Surplus Inventory
                </p>
            </div>

            {/* Stepper */}
            <div className="stepper">
                {steps.map((label, index) => (
                    <div
                        key={index}
                        className={`step ${step === index + 1 ? "active" : ""}`}
                    >
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
                        setErrors={setErrors}
                        handleSubmitFinal={nextStep}
                        setFormData={setFormData}
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
                        setFormData={setFormData}
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
                    <div
                        className="rigions"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: "5rem 0",
                        }}
                    >
                        <label>Enter Regions (comma separated)</label>

                        <input
                            type="text"
                            placeholder="e.g. India, USA, Europe"
                            value={
                                Array.isArray(formData.region)
                                    ? formData.region.join(", ")
                                    : ""
                            }
                            onChange={(e) => {
                                const value = e.target.value;

                                const regionsArray = value
                                    .split(",")
                                    .map((r) => r.trim())
                                    .filter((r) => r !== "");

                                setFormData({
                                    ...formData,
                                    region: regionsArray,
                                });

                                if (regionsArray.length > 0) {
                                    setErrors({ ...errors, region: "" });
                                }
                            }}
                            className={errors.region ? "error" : ""}
                        />

                        {errors.region && (
                            <p className="error-text">{errors.region}</p>
                        )}
                    </div>
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