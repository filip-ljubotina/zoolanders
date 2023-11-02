const ROLE_KEY = 'role';

const RoleService = {
    getRole: () => localStorage.getItem(ROLE_KEY),
    setRole: (role) => localStorage.setItem(ROLE_KEY, role),
    removeRole: () => localStorage.removeItem(ROLE_KEY),
};

export default RoleService;