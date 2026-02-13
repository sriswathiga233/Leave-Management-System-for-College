import { createContext, useContext, useState, useEffect } from "react";
import { getUsers, saveUser, initializeDb } from "../utils/mockDb";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeDb();
        const storedUser = localStorage.getItem("slms_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password, role) => {
        const users = getUsers();
        const foundUser = users.find(
            (u) => u.email === email && u.password === password && u.role === role
        );
        if (foundUser) {
            setUser(foundUser);
            localStorage.setItem("slms_user", JSON.stringify(foundUser));
            return { success: true };
        }
        return { success: false, message: "Invalid credentials" };
    };

    const register = (userData) => {
        const users = getUsers();
        if (users.find((u) => u.email === userData.email)) {
            return { success: false, message: "Email already exists" };
        }
        const newUser = { ...userData, id: Date.now().toString() };
        saveUser(newUser);
        // Auto login after register
        setUser(newUser);
        localStorage.setItem("slms_user", JSON.stringify(newUser));
        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("slms_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
