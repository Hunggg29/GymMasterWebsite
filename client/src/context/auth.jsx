import {useState, useEffect, useContext, createContext} from "react";
import axios from "axios";
const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // default axios
    useEffect(() => {
        console.log("Auth token changed:", auth?.token);
        if (auth?.token) {
            console.log("Setting Authorization header with token");
            axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        } else {
            console.log("Removing Authorization header");
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [auth?.token]);

    useEffect(() => {
        console.log("Checking localStorage for auth data");
        const data = localStorage.getItem("auth");
        if (data) {
            try {
                console.log("Found auth data in localStorage:", data);
                const parsedData = JSON.parse(data);
                console.log("Parsed auth data:", parsedData);
                if (parsedData.user && parsedData.token) {
                    console.log("Setting auth state with user data:", parsedData.user);
                    setAuth({
                        user: parsedData.user,
                        token: parsedData.token
                    });
                } else {
                    console.log("Invalid auth data format in localStorage");
                    localStorage.removeItem("auth");
                }
            } catch (err) {
                console.error("Error parsing auth data:", err);
                localStorage.removeItem("auth");
            }
        } else {
            console.log("No auth data found in localStorage");
        }
    }, []);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hooks
const useAuth = () => {
    return useContext(AuthContext);
}

export {AuthProvider, useAuth};