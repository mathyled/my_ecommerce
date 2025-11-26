import { useState, useMemo, useCallback } from "react";
import { AuthContext } from "./AuthContext.js";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = useCallback((username) => {
        const token = `fake-token-${username}` // Suponiendo que username contiene un token
        localStorage.setItem("authToken", token);
        setUser(username);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("authToken");
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [user, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
