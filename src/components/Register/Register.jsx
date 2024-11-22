import { useState } from 'react';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
    const { handleRegister } = useAuth(); 
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false); 

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isValidLength = password.length >= 6;
        return hasUpperCase && hasLowerCase && isValidLength;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword(password)) {
            setError('Password must have at least 6 characters, including an uppercase and a lowercase letter.');
            toast.error('Password must have at least 6 characters, including an uppercase and a lowercase letter.');
            return;
        }

        try {
            await handleRegister({ name, email, photoURL, password }); 
            toast.success('Registration successful!'); 
            navigate('/'); // Redirect to home page after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
            toast.error('Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-200 to-purple-300">
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} closeOnClick pauseOnHover draggable />
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
                <h1 className="text-3xl font-bold mb-4 text-center">User Registration</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg p-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg p-2 mb-4 w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="border rounded-lg p-2 mb-4 w-full"
                        required
                    />
                    <div className="relative mb-4">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-lg p-2 w-full"
                            required
                        />
                        <span 
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" 
                            onClick={() => setShowPassword(!showPassword)} // Toggle show/hide password
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />} 
                        </span>
                    </div>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                    <button type="submit" className="bg-purple-500 text-white rounded-lg px-4 py-2 w-full">
                        Register
                    </button>
                    <p className="mt-2 text-center">
                        Already have an account? <a href="/login" className="text-blue-500">Login</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;