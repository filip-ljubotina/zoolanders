import React, { useState } from 'react';
import ApiService from '../../app';
import TokenService from '../services/TokenService';
import RoleService from '../services/RoleService';


const LoginComponent = (props) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await ApiService.post('/logIn', loginData);
            TokenService.setToken(response.data.token);
            RoleService.setRole(response.data.role)
            props.onLoginSuccess();
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>User Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={loginData.username}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;
