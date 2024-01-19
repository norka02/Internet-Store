import React, { useState } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    console.log(registerData);
    if (!recaptchaValue) {
      alert("Please complete the reCAPTCHA!");
      return;
    }

    const requiredFields = ["firstName", "lastName", "email", "password"];
    const missingFields = requiredFields.filter(
      (field) => !registerData[field]
    );

    if (missingFields.length > 0) {
      alert(
        `Please provide values for the following fields: ${missingFields.join(
          ", "
        )}`
      );
      return;
    }

    const requestData = {
      first_name: registerData.firstName,
      last_name: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        requestData,
        {
          //registerData
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/user-profile");
    } catch (error) {
      alert("Error during registration:");
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="register-form-title">Formularz rejestracji</h2>

      <label className="register-form-label">First Name:</label>
      <input
        className="register-form-input"
        type="text"
        name="firstName"
        value={registerData.firstName}
        onChange={handleChange}
      />

      <label className="register-form-label">Last Name:</label>
      <input
        className="register-form-input"
        type="text"
        name="lastName"
        value={registerData.lastName}
        onChange={handleChange}
      />

      <label className="register-form-label">Email:</label>
      <input
        className="register-form-input"
        type="text"
        name="email"
        value={registerData.email}
        onChange={handleChange}
        pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
      />

      <label className="register-form-label">Password:</label>
      <input
        className="register-form-input"
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleChange}
      />

      <ReCAPTCHA
        sitekey="6Lem2SInAAAAAFr2kVbbMxuzWnfWjIy-_GpWYRwR"
        onChange={(value) => setRecaptchaValue(value)}
      />

      <button className="register-form-button" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
