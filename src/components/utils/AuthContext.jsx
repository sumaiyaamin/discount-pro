import { createContext, useContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config'; 
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    createUserWithEmailAndPassword, 
    updateProfile, 
    sendPasswordResetEmail, 
    GoogleAuthProvider, 
    signInWithPopup 
} from 'firebase/auth';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); 
    const provider = new GoogleAuthProvider(); 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
            setLoading(false);
        });

        return () => unsubscribe(); 
    }, []);

    const handleRegister = async ({ name, email, photoURL, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name, photoURL });

            setUser(user); 
            setIsAuthenticated(true); 
        } catch (error) {
            console.error('Registration error:', error);
            throw error; 
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; 
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    };

    const updateUser = async ({ displayName, photoURL }) => {
        if (user) {
            try {
                await updateProfile(user, { displayName, photoURL });
                setUser({ ...user, displayName, photoURL }); 
            } catch (error) {
                console.error('Error updating user information:', error);
                throw error;
            }
        } else {
            throw new Error('No user is currently logged in.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            setUser(user);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Google login error:', error);
            throw error; // Rethrow the error to handle it in the Login component
        }
    };

    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            console.log('Password reset email sent.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            throw error; 
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            loading, 
            handleRegister, 
            handleLogin, 
            handleLogout, 
            updateUser, 
            handleGoogleLogin, 
            sendPasswordReset 
        }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};


AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AuthContext };