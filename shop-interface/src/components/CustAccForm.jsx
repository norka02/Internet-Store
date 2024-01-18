import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CustAccForm.css'

const CustAccForm = () => {
    const [registerData, setRegisterData] = useState({
        // firstName: "",
        // lastName: "",
        // email: "",
        // password: "",
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

        // Przekazuj tylko niezbędne pola
        const requestData = {
        phone: registerData.phone,
        street: registerData.street,
        house_number: registerData.houseNumber,
        apartment_number: registerData.apartmentNumber,
        city: registerData.city,
        postal_code: registerData.postalCode,
        province: registerData.province,
        };

        
        try {
            const email_check = sessionStorage.getItem('email')
            //const response = await axios.post('http://localhost:8000/api/customerInfoUpdate/${email_check}/', requestData, email_check);
            const response = await axios.patch(`http://localhost:8000/api/customerInfoUpdate/${email_check}/`, requestData);
            // const response = await axios.post('http://localhost:8000/api/customerInfoUpdate/', requestData, {
            //     params: {
            //         email_check: email_check
            //     }
            // });
            console.log(response.data);
            navigate('/user-profile')
            alert('Updating customer account info gone succesfully')
        } catch (error) {
            console.error('Error during updating customer account info:', error.response.data);
            alert('Error during updating customer account info -> contact with us')
        }
    };

    return (
        <div className='update-form-container'>
            <h2 className='update-form-title'>Formularz uzupełniania danych</h2>            

            <label className='update-form-label'>Phone:</label>
            <input className='update-form-input' type="tel" name='phone' value={registerData.phone} onChange={handleChange} /> 

            <label className='update-form-label'>Street:</label>
            <input className='update-form-input' type="text" name='street' value={registerData.street} onChange={handleChange} /> 

            <label className='update-form-label'>House number:</label>
            <input className='update-form-input' type="text" name='houseNumber' value={registerData.houseNumber} onChange={handleChange} /> 

            <label className='update-form-label'>Apartment number:</label>
            <input className='update-form-input' type="text" name='apartmentNumber' value={registerData.apartmentNumber} onChange={handleChange} /> 

            <label className='update-form-label'>City:</label>
            <input className='update-form-input' type="text" name='city' value={registerData.city} onChange={handleChange} /> 

            <label className='update-form-label'>Postal code:</label>
            <input className='update-form-input' type="text" name='postalCode' value={registerData.postalCode} onChange={handleChange} /> 

            <label className='update-form-label'>Province:</label>
            <input className='update-form-input' type="text" name='province' value={registerData.province} onChange={handleChange} />

            <button className='update-form-button' onClick={handleRegister}>Update Info</button>
        </div>
    );
};

export default CustAccForm;
