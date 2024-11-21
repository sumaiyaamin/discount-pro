import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    const handleRegister = (userData) => {
        
        setUser(userData); 
        setIsAuthenticated(true); 
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, handleLogin, handleLogout, handleRegister }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => {
    return useContext(AuthContext); 
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext }; 