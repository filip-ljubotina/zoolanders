const FIRST_NAME_KEY = "firstName";
const LAST_NAME_KEY = "lastName";
const USER_NAME_KEY = "userName";
const EMAIL_KEY = "email";
const IMAGE_KEY = "image";

const UserInfoService = {
  getFirstName: () => localStorage.getItem(FIRST_NAME_KEY),
  setFirstName: (firstName) => localStorage.setItem(FIRST_NAME_KEY, firstName),
  removeFirstName: () => localStorage.removeItem(FIRST_NAME_KEY),

  getLastName: () => localStorage.getItem(LAST_NAME_KEY),
  setLastName: (lastName) => localStorage.setItem(LAST_NAME_KEY, lastName),
  removeLastName: () => localStorage.removeItem(LAST_NAME_KEY),

  getUserName: () => localStorage.getItem(USER_NAME_KEY),
  setUserName: (userName) => localStorage.setItem(USER_NAME_KEY, userName),
  removeUserName: () => localStorage.removeItem(USER_NAME_KEY),

  getEmail: () => localStorage.getItem(EMAIL_KEY),
  setEmail: (email) => localStorage.setItem(EMAIL_KEY, email),
  removeEmail: () => localStorage.removeItem(EMAIL_KEY),

  getImage: () => localStorage.getItem(IMAGE_KEY),
  setImage: (image) => localStorage.setItem(IMAGE_KEY, image),
  removeImage: () => localStorage.removeItem(IMAGE_KEY),
};

export default UserInfoService;
