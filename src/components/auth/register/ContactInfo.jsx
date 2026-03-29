import React from "react";

const ContactInfo = ({ formData, handleChange, errors }) => {
  return (
    <div className="contact-info-container">
      
      {/* Entity Type */}
      <div className="form-group">
        <label>Select</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="entityType"
              value="company"
              checked={formData.entityType === "company"}
              onChange={handleChange}
            />
            Entity/Company
          </label>

          <label>
            <input
              type="radio"
              name="entityType"
              value="individual"
              checked={formData.entityType === "individual"}
              onChange={handleChange}
            />
            Individual
          </label>
        </div>
      </div>

      {/* Industry & Company */}
      <div className="form-row">
        <div className="form-group">
          <label>Industry *</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className={errors.industry ? "error" : ""}
            style={{padding: "10px 0"}}
          >
            <option value="">Select Industry</option>
            <option value="it">IT</option>
            <option value="finance">Finance</option>
            <option value="health">Healthcare</option>
          </select>
          {errors.industry && <p className="error-text">{errors.industry}</p>}
        </div>

        <div className="form-group">
          <label>Company *</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? "error" : ""}
          />
          {errors.company && <p className="error-text">{errors.company}</p>}
        </div>
      </div>

      {/* Address */}
      <div className="form-group">
        <label>Address *</label>
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address ? "error" : ""}
        />
        {errors.address && <p className="error-text">{errors.address}</p>}
      </div>

      {/* City & Zip */}
      <div className="form-row">
        <div className="form-group">
          <label>City *</label>
          <input
            name="city"
            value={formData.city}
            onChange={handleChange}
            className={errors.city ? "error" : ""}
          />
          {errors.city && <p className="error-text">{errors.city}</p>}
        </div>

        <div className="form-group">
          <label>Zip Code *</label>
          <input
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            className={errors.zip ? "error" : ""}
          />
          {errors.zip && <p className="error-text">{errors.zip}</p>}
        </div>
      </div>

      {/* Country & State */}
      <div className="form-row">
        <div className="form-group">
          <label>Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={errors.country ? "error" : ""}
            style={{padding: "10px 0"}}
          >
            <option value="">Select Country</option>
            <option value="usa">United States</option>
            <option value="india">India</option>
          </select>
          {errors.country && <p className="error-text">{errors.country}</p>}
        </div>

        <div className="form-group">
          <label>State *</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={errors.state ? "error" : ""}
            style={{padding: "10px 0"}}
          >
            <option value="">Select State</option>
            <option value="hdhdh">dhhd</option>
          </select>
          {errors.state && <p className="error-text">{errors.state}</p>}
        </div>
      </div>

      {/* Phone & Website */}
      <div className="form-row">
        <div className="form-group">
          <label>Business Phone</label>
          <div className="phone-group" style={{display: 'flex', gap: '2rem'}}>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              name="ext"
              placeholder="Ext"
              value={formData.ext}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;