import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isBlocked, setIsBlocked] = useState(false);
    const navigate = useNavigate();


    const handleLogin = async () => {
        if (isBlocked) {
            alert('Too many unsuccessful login attempts. Please try again after 2 minutes.');
            return;
        }

        if (!recaptchaValue) {
            alert('Please complete the reCAPTCHA!');
            return;
        }
        
        console.log(email, password);
    
        try {
            const response = await axios.post('http://localhost:8000/api/login/', { email, password }); //, recaptchaValue
            console.log(response.data);
            alert("Login successful ;)")
            // setLoggedIn(email);
            navigate('/user-profile')
            sessionStorage.setItem('isLoggedIn', true)
            sessionStorage.setItem('email', email)
        } catch (error) {
            console.error('Error during login:', error.response.data);
            alert("Either the password is incorrect or the email :((")

            // Increment login attempts
            setLoginAttempts(loginAttempts + 1);

            // If 3 unsuccessful attempts, block for 15 minutes
            if (loginAttempts >= 2) {
                setIsBlocked(true);
                setTimeout(() => {
                    setIsBlocked(false);
                    setLoginAttempts(0);
                }, 120000); // 2 minutes in milliseconds
            }
            
            navigate("/sign-in");
        }
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    
    //     const orderData = {
    //       customer: customerData,
    //       items: cartItems,
    //       totalAmount: getTotalCartAmount(),
    //     };
    //     console.log(orderData);
    //     axios
    //       .post("http://localhost:8000/api/orders/", orderData)
    //       .then((response) => {
    //         console.log(response.data);
    //         // Obsługa po pomyślnym wysłaniu danych (np. wyświetlenie komunikatu, wyczyszczenie koszyka)
    //       })
    //       .catch((error) => {
    //         console.error("Error sending order", error);
    //         // Obsługa błędów
    //       });
    //   };

    return (
        <div className='login-form-container'>
            <h2 className='login-form-title'>Formularz logowania</h2>
            
            <label className='login-form-label'>Email:</label>
            <input className='login-form-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label className='login-form-label'>Password:</label>
            <input className='login-form-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <ReCAPTCHA
                sitekey="6Lem2SInAAAAAFr2kVbbMxuzWnfWjIy-_GpWYRwR"   //TODO: dodać recaptchaKEY
                onChange={(value) => setRecaptchaValue(value)}
            />

            <button className='login-form-button' onClick={handleLogin}>Sign In</button>
        </div>
    );
};

export default LoginForm;
