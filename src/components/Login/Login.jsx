import { useState } from 'react';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import { FaGoogle } from 'react-icons/fa'; 

const Login = () => {
    const { handleLogin, handleGoogleLogin } = useAuth(); 
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        try {
            await handleLogin(email, password);
            toast.success('Login successful!'); 
            navigate('/'); 
        } catch (err) {
            setError('Login failed. Please check your credentials.'); 
            toast.error('Login failed. Please check your credentials.'); 
            console.error('Login error:', err); 
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await handleGoogleLogin(); 
            toast.success('Google login successful!'); 
            navigate('/'); 
        } catch (err) {
            setError('Google login failed. Please try again.'); 
            toast.error('Google login failed. Please try again.'); 
            console.error('Google login error:', err); 
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-300">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-4 text-center">User Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg p-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg p-2 mb-4 w-full"
                        required
                    />
                    {error && <p className="text-purple-500 mb-4 text-center">{error}</p>} {/* Display error message */}
                    <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2 mb-2 w-full">
                        Login
                    </button>
                    <p className="mt-2 text-center">
                        <a href="/forgot-password" className="text-purple-500">Forgot Password?</a>
                    </p>
                    <p className="mt-2 text-center">
                        Dont have an account? <a href="/register" className="text-purple-500">Register</a>
                    </p>
                    <p className="mt-2 text-center">
                        <button 
                            type="button" 
                            onClick={handleGoogleSignIn} 
                            className="bg-purple-400 text-white rounded-lg px-4 py-2 w-full flex items-center justify-center"
                        >
                            <FaGoogle className="mr-2" /> 
                            Login with Google
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;