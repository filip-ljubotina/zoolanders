import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Password from "remixicon-react/Lock2FillIcon";
import Email from "remixicon-react/MailFillIcon";
import ApiService from "../../services/ApiService";
import RoleService from "../../services/RoleService";
import StationService from "../../services/StationService";
import TokenService from "../../services/TokenService";
import UserInfoService from "../../services/UserInfoService";
import background_photo from "../Assets/login-bg.png";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  Login.propTypes = {
    onLoginSuccess: PropTypes.func,
  };

  const [loginData, setLoginData] = React.useState({ email: "", password: "" });
  const [error, setError] = React.useState(null);

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
      const response = await ApiService.post("/logIn", loginData);
      TokenService.setToken(response.data.token);
      RoleService.setRole(response.data.role);
      StationService.setStation(response.data.stationName);
      UserInfoService.setFirstName(response.data.firstName);
      UserInfoService.setLastName(response.data.lastName);
      UserInfoService.setUserName(response.data.userName);
      UserInfoService.setEmail(response.data.email);
      UserInfoService.setImage(response.data.image);
      onLoginSuccess();
    } catch (error) {
      setError(
        "Greška pri unosu korisničkog imena i lozinke! Pokušajte ponovno."
      );
    }
  };

  return (
    <div className="login">
      <img
        src={background_photo}
        alt="login image"
        className="login-image"
      ></img>

      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-header"> Prijava </h1>

        <div className="login-inputs">
          <div className="login-input-container">
            <Email className="login-icon" />
            <div className="login-input">
              <input
                type="email"
                required
                className="login-textfield"
                id="login-email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="login-email" className="login-label">
                Email
              </label>
            </div>
          </div>

          <div className="login-input-container">
            <Password className="login-icon" />
            <div className="login-input">
              <input
                type="password"
                required
                className="login-textfield"
                id="login-password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="login-password" className="login-label">
                Lozinka
              </label>
            </div>
          </div>
        </div>

        {error && <div className="login-error">{error}</div>}

        <button type="submit" className="login-button">
          Prijavi se
        </button>

        <p className="login-register">
          Nemaš račun? <Link to="/register">Registriraj se</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
