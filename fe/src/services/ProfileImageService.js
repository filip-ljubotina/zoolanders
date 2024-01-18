const PROFILE_IMAGE_KEY = "image";

const ProfileImageService = {
  getProfileImage: () => localStorage.getItem(PROFILE_IMAGE_KEY),
  setProfileImage: (image) => localStorage.setItem(PROFILE_IMAGE_KEY, image),
  removeProfileImage: () => localStorage.removeItem(PROFILE_IMAGE_KEY),
};

export default ProfileImageService;
