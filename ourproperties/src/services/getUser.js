import {jwtDecode} from 'jwt-decode';  

export const getUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            return decodedToken.sub; // Assuming the role is stored in the token
        } catch (error) {
            console.error("Token decoding failed:", error);
            return null;
        }
    }
    return null;
};
