import {jwtDecode} from 'jwt-decode';

export function isAuthenticated() {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token); 

    if (!token) {
        return false; 
    }

    try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded token:", decodedToken); 
        console.log("role:", decodedToken.role);

        
        if (!decodedToken.exp) {
            console.error("Token does not have an expiration time.");
            return false;
        }

        const currentTime = Date.now() / 1000; 

        
        return decodedToken.exp > currentTime;
    } catch (error) {
        console.error("Token decoding failed:", error);
        return false; 
    }
}
