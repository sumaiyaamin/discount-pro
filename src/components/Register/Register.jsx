import { useState } from 'react';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const Register = () => {
    const { handleRegister } = useAuth(); 
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            navigate('/'); // Redirect to home page after successful registration
        } catch (err) {
            setError('Registration failed. Please try again.');
            toast.error('Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Registration</h1>
            <form onSubmit={handleSubmit} className="border rounded-lg p-4">
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
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border rounded-lg p-2 mb-4 w-full"
                    required
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Register
                </button>
                <p className="mt-2">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;