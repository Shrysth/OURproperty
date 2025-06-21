import {jwtDecode} from 'jwt-decode';  

export const getUserName = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.name; // Assuming the role is stored in the token
        } catch (error) {
            console.error("Token decoding failed:", error);
            return null;
        }
    }
    return null;
};
