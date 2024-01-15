import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!recaptchaValue) {
            alert('Please complete the reCAPTCHA!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login/', { username, password }); //, recaptchaValue
            console.log(response.data);
            alert("Login successful ;)")
            navigate("/");
        } catch (error) {
            console.error('Error during login:', error.response.data);
            alert("Either the password is incorrect or the username :((")
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
        <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

            <ReCAPTCHA
                sitekey="6Lem2SInAAAAAFr2kVbbMxuzWnfWjIy-_GpWYRwR"   //TODO: dodać recaptchaKEY
                onChange={(value) => setRecaptchaValue(value)}
            />

            <button onClick={handleLogin}>Sign In</button>
        </div>
    );
};

export default LoginForm;
