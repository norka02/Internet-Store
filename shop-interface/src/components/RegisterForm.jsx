import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        street: "",
        houseNumber: "",
        apartmentNumber: "",
        city: "",
        postalCode: "",
        province: "",
    })
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
      };

    const handleRegister = async () => {
        console.log(registerData);
        if (!recaptchaValue) {
            alert('Please complete the reCAPTCHA!');
            return;
        }

        // Sprawdź, czy użytkownik podał wszystkie wymagane informacje
        const requiredFields = ['firstName', 'lastName', 'email', 'password'];
        const missingFields = requiredFields.filter(field => !registerData[field]);

        if (missingFields.length > 0) {
        alert(`Please provide values for the following fields: ${missingFields.join(', ')}`);
        return;
        }

        // Przekazuj tylko niezbędne pola
        const requestData = {
        first_name: registerData.firstName,
        last_name: registerData.lastName,
        email: registerData.email,
        password: registerData.password,
        };

        // const hashedPassword = await bcrypt.hash(registerData.password, 10);

        // Sprawdź, czy wprowadzony e-mail jest poprawny
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registerData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:8000/api/register/', requestData, {    //registerData
                headers: {
                    'Content-Type': 'application/json',
              },
            }); //requestData api/
            console.log(response.data);
            // Dodaj kod obsługi pozytywnej odpowiedzi
        } catch (error) {
            console.error('Error during registration:', error.response.data);
            // Dodaj kod obsługi błędu
        }
    };

    return (
        <div>
            <h2>Formularz rejestracji</h2>
            <label>First Name:</label>
            <input type="text" name='firstName' value={registerData.firstName} onChange={handleChange} />

            <label>Last Name:</label>
            <input type="text" name='lastName' value={registerData.lastName} onChange={handleChange} />

            <label>Email:</label>
            <input type="text" name='email' value={registerData.email} onChange={handleChange} pattern="[^\s@]+@[^\s@]+\.[^\s@]+" /> 
            {/* //(e) => setRegisterData(e.target.value) */}

            <label>Password:</label>
            <input type="password" name='password' value={registerData.password} onChange={handleChange} />

            <label>Phone:</label>
            <input type="tel" name='phone' value={registerData.phone} onChange={handleChange} /> 

            <label>Street:</label>
            <input type="text" name='street' value={registerData.street} onChange={handleChange} /> 

            <label>House number:</label>
            <input type="text" name='houseNumber' value={registerData.houseNumber} onChange={handleChange} /> 

            <label>Apartment number:</label>
            <input type="text" name='apartmentNumber' value={registerData.apartmentNumber} onChange={handleChange} /> 

            <label>City:</label>
            <input type="text" name='city' value={registerData.city} onChange={handleChange} /> 

            <label>Postal code:</label>
            <input type="text" name='postalCode' value={registerData.postalCode} onChange={handleChange} /> 

            <label>Province:</label>
            <input type="text" name='province' value={registerData.province} onChange={handleChange} /> 

            <ReCAPTCHA
                sitekey="6Lem2SInAAAAAFr2kVbbMxuzWnfWjIy-_GpWYRwR"
                onChange={(value) => setRecaptchaValue(value)}
            />

            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegisterForm;
