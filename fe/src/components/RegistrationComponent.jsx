import React, { useState } from 'react';
import ApiService from '../../app';

const RegistrationComponent = () => {
    const [userData, setUserData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        image: null,
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
        
                reader.onload = () => {
                    const base64String = reader.result.split(',')[1]; // Extracting the Base64-encoded string
        
                    setUserData({...userData,
                        image: base64String,});
                };
        
                reader.readAsDataURL(file);
            }
        } else {
            setUserData({
                ...userData,
                [e.target.name]: e.target.value,
            });
        }
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(userData.image);
            const response = await ApiService.post('/registration', userData);
            setSuccess(true);
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>User Registration</h2>
            {success && <p>Registration successful! Please log in.</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="userName"
                        value={userData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    User Photo:
                    <input
                        type="file"
                        name="image"
                        accept=".png"
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    First Name :
                    <input
                        type="text"
                        name="firstName"
                        value={userData.firstName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Last Name :
                    <input
                        type="text"
                        name="lastName"
                        value={userData.lastName}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Email :
                    <input
                        type="text"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Role:
                    <select
                        name="role"
                        value={userData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select a role</option>
                        {/* <option value="ADMIN">Admin</option> */}
                        <option value="RESEARCHER">Researcher</option>
                        <option value="STATION_MANAGER">Station Manager</option>
                        <option value="SEARCHER_IN_THE_FIELD">Searcher in the Field</option>
                    </select>
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationComponent;
