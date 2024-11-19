import  { useState } from 'react';
import { useUser } from '/Pro-Hero/discount-pro/src/utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const Login = () => {
    const { handleLogin } = useUser();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login 
        if (email === 'test@example.com' && password === 'Password123') {
            handleLogin({ email });
            navigate('/'); // Redirect to home
        } else {
            setError('Invalid email or password'); 
            toast.error('Invalid email or password'); 
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Login</h1>
            <form onSubmit={handleSubmit} className="border rounded-lg p-4">
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>} 
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Login
                </button>
                <p className="mt-2">
                    <a href="/forgot-password" className="text-blue-500">Forgot Password?</a>
                </p>
                <p className="mt-2">
                    Do u have an account? <a href="/register" className="text-blue-500">Register</a>
                </p>
            </form>
        </div>
    );
};

export default Login;