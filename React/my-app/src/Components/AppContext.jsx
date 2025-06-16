import React, { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [username, setUsername] = useState(sessionStorage.getItem("username") || null);
    const [role, setRole] = useState(sessionStorage.getItem("role") || null);
    const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);
    const [functionHallId, setFunctionHallId] = useState(null); // New state for function hall ID

    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
        "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
        "West Bengal", "Andaman and Nicobar Islands", "Chandigarh"
    ];

    useEffect(() => {
        if (username !== null) {
            sessionStorage.setItem("username", username);
        }
    }, [username]);

    useEffect(() => {
        if (role !== null) {
            sessionStorage.setItem("role", role);
        }
    }, [role]);

    useEffect(() => {
        if (userId !== null) {
            sessionStorage.setItem("userId", userId);
        }
    }, [userId]);

    const updateUsername = (name) => setUsername(name);
    const updateRole = (userRole) => setRole(userRole);
    const updateUserId = (id) => setUserId(id);
    const updateFunctionHallId = (id) => setFunctionHallId(id); // New function to update functionHallId

    const logout = () => {
        setUsername(null);
        setRole(null);
        setUserId(null);
        setFunctionHallId(null);
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("userId");
    };

    const login = (name, userRole, id) => {
        setUsername(name);
        setRole(userRole);
        setUserId(id);
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("userId", id);
    };

    return (
        <AppContext.Provider value={{
            username,
            role,
            userId,
            functionHallId, // Expose functionHallId
            stateList,
            updateUsername,
            updateRole,
            updateUserId,
            updateFunctionHallId, // Expose updateFunctionHallId function
            login,
            logout,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
