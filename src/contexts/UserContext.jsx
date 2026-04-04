import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8089/profile/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Хук для удобного использования
export const useUser = () => useContext(UserContext);