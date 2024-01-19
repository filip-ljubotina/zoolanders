import React from "react";
import Password from "remixicon-react/Lock2FillIcon";
import Email from "remixicon-react/MailFillIcon";
import User from "remixicon-react/UserLineIcon";
import ApiService from "../../services/ApiService";
import background_photo from "../Assets/login-bg.png";
import Placeholder from "../Assets/profile-placeholder.png";
import "./Register.css";

const Register = () => {
  const [userData, setUserData] = React.useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    image: "",
    station: "",
  });
  const [image, setImage] = React.useState(Placeholder);

  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          const base64String = reader.result.split(",")[1]; // Extracting the Base64-encoded string

          setUserData({ ...userData, image: base64String });
          setImage(reader.result);
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
    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.post("/registration", userData);
      setSuccess(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="register">
      <img
        src={background_photo}
        alt="login image"
        className="background-image"
      ></img>
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 className="register-header"> Registracija </h1>

        <div className="register-inputs">
          <div className="register-input-container name-photo">
            <div className="register-input">
              <div className="register-input-container">
                <div className="register-input">
                  <input
                    type="text"
                    required
                    className="register-textfield"
                    id="register-firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <label
                    htmlFor="register-firstName"
                    className="register-label"
                  >
                    Ime
                  </label>
                </div>
              </div>

              <div className="register-input-container">
                <div className="register-input">
                  <input
                    type="text"
                    required
                    className="register-textfield"
                    id="register-lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder=""
                  />
                  <label htmlFor="register-lastName" className="register-label">
                    Prezime
                  </label>
                </div>
              </div>
            </div>
            <div className="register-input-photo">
              <label htmlFor="photo-upload" className="custom-file-upload">
                <div className="img-wrap img-upload">
                  <img htmlFor="photo-upload" src={image} />
                </div>
                <input
                  id="photo-upload"
                  type="file"
                  required
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="register-input-container">
            <User className="register-icon" />
            <div className="register-input">
              <input
                type="text"
                required
                className="register-textfield"
                id="register-username"
                name="userName"
                value={userData.userName}
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="register-username" className="register-label">
                Korisničko ime
              </label>
            </div>
          </div>

          <div className="register-input-container">
            <Email className="register-icon" />
            <div className="register-input">
              <input
                type="email"
                required
                className="register-textfield"
                id="register-email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                placeholder=""
              />
              <label htmlFor="register-email" className="register-label">
                Email
              </label>
            </div>
          </div>

          <div className="register-input-container">
            <Password className="register-icon" />
            <div className="register-input">
              <input
                type="password"
                required
                className="register-textfield"
                id="register-password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder=" "
              />
              <label htmlFor="register-password" className="register-label">
                Password
              </label>
            </div>
          </div>

          <div className="register-input-buttons" onChange={handleChange}>
            <div className="register-input-buttons-group">
              <input
                type="radio"
                className="register-role-button"
                id="register-searcher"
                name="role"
                value="SEARCHER_IN_THE_FIELD"
              />
              <label
                htmlFor="register-searcher"
                className="register-button-label"
              >
                Tragač
              </label>
            </div>
            <div className="register-input-buttons-group">
              <input
                type="radio"
                className="register-role-button"
                id="register-manager"
                name="role"
                value="STATION_MANAGER"
              />
              <label
                htmlFor="register-manager"
                className="register-button-label"
              >
                Voditelj postaje
              </label>
            </div>
            <div className="register-input-buttons-group">
              <input
                type="radio"
                className="register-role-button"
                id="register-researcher"
                name="role"
                value="RESEARCHER"
              />
              <label
                htmlFor="register-researcher"
                className="register-button-label"
              >
                Istraživač
              </label>
            </div>
          </div>

          {userData.role === "STATION_MANAGER" && (
            <div className="register-input-container select">
              <select
                id="station-dropdown"
                name="station"
                onChange={handleChange}
                className="register-textfield"
              >
                <option value="">Odaberite postaju</option>
                <option value="biokovo">Biokovo</option>
                <option value="lonjsko_polje">Lonjsko polje</option>
              </select>
            </div>
          )}
        </div>

        <div className="register-error">{error}</div>
        {success && (
          <div className="register-success">Registracija uspješna!</div>
        )}
        <button type="submit" className="register-button">
          Registriraj se
        </button>
      </form>
    </div>
  );
};

export default Register;
