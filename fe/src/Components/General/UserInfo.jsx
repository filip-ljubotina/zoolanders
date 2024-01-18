import PropTypes from "prop-types";
import Password from "remixicon-react/Lock2FillIcon";
import Email from "remixicon-react/MailFillIcon";
import User from "remixicon-react/UserLineIcon";
import RoleService from "../../services/RoleService";
import UserInfoService from "../../services/UserInfoService";
import Placeholder from "../Assets/profile-placeholder.png";
import Sidebar from "../General/Sidebar";
import Topbar from "../General/Topbar";
import "./UserInfo.css";

const UserInfo = ({ onLogout, categories, user }) => {
  UserInfo.propTypes = {
    onLogout: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
  };

  return (
    <div className="users">
      <Sidebar categories={categories} user={user} />
      <div className="usersContainer">
        <Topbar title="Pregled osobnih podataka" onLogout={onLogout} />
        <div className="userInfo-card">
          <h1 className="register-header"> Moji podaci </h1>

          <div className="userInfo-rows">
            <div className="register-input-container name-photo">
              <div className="register-input">
                <div className="register-input-container">
                  <div className="register-input">
                    <input
                      type="text"
                      required
                      className="register-textfield"
                      id="firstName"
                      name="firstName"
                      value={UserInfoService.getFirstName()}
                      disabled
                    />
                    <label htmlFor="firstName" className="register-label">
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
                      id="lastName"
                      name="lastName"
                      value={UserInfoService.getLastName()}
                      disabled
                    />
                    <label htmlFor="lastName" className="register-label">
                      Prezime
                    </label>
                  </div>
                </div>
              </div>
              <div className="register-input-photo">
                <div className="img-wrap">
                  <img
                    alt="profile-user"
                    src={
                      UserInfoService.getImage() !== "null"
                        ? `data:image/jpeg;base64,${UserInfoService.getImage()}`
                        : Placeholder
                    }
                    style={{ borderRadius: "50%" }}
                  />
                </div>
              </div>
            </div>
            <div className="register-input-container">
              <User className="register-icon" />
              <div className="register-input">
                <input
                  type="text"
                  required
                  className="register-textfield"
                  id="username"
                  name="userName"
                  value={UserInfoService.getUserName()}
                  disabled
                />
                <label htmlFor="username" className="register-label">
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
                  id="email"
                  name="email"
                  value={UserInfoService.getEmail()}
                  disabled
                />
                <label htmlFor="email" className="register-label">
                  Email
                </label>
              </div>
            </div>

            <div className="register-input-container">
              <Password className="register-icon" />
              <div className="register-input">
                <input
                  type="text"
                  required
                  className="register-textfield"
                  id="role"
                  name="role"
                  value={
                    RoleService.getRole() === "ADMIN"
                      ? "Admin"
                      : RoleService.getRole() === "SEARCHER_IN_THE_FIELD"
                      ? "Tragač"
                      : RoleService.getRole() === "STATION_MANAGER"
                      ? "Voditelj postaje"
                      : "Istraživač"
                  }
                  disabled
                />
                <label htmlFor="role" className="register-label">
                  Uloga
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
