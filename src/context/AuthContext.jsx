import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = sessionStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const [isAuth, setIsAuth] = useState(() => sessionStorage.getItem("isAuth") === "true");

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("isAuth", isAuth);
    }, [user, isAuth]);

    const login = (userData) => {
        setUser(userData);
        setIsAuth(true);
    };

    const logout = () => {
        
        setIsAuth(false);
        sessionStorage.removeItem("isAuth");
    };
    const deleteAccount=()=>{
        setUser(null);
        setIsAuth(false);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("isAuth");
    }

    return (
        <AuthContext.Provider value={{ user, isAuth, login, logout,deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};
