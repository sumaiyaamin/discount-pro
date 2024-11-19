
import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types'; 


const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    const handleLogin = (userData) => {
        setUser(userData); 
    };

    const handleLogout = () => {
        setUser(null); 
    };

    return (
        <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};


UserProvider.propTypes = {
    children: PropTypes.node.isRequired, 
};