import { useState } from 'react';
import { useUser } from '/Pro-Hero/discount-pro/src/utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const Register = () => {
    const { handleRegister } = useUser(); 
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            setError('Password must have at least 6 characters, including an uppercase and a lowercase letter.');
            toast.error('Password must have at least 6 characters, including an uppercase and a lowercase letter.');
            return;
        }

      
        handleRegister({ name, email, photoURL }); 
        navigate('/'); 
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">User Registration</h1>
            <form onSubmit={handleSubmit} className="border rounded-lg p-4">
                <div className="mb-4">
                    <label className="block mb-2">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg p-2 w-full"
                        required
                    />
                </div>
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
                    <label className="block mb-2">Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
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
                {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
                <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">
                    Register
                </button>
                <p className="mt-2">
                    Already have an account? <a href="/login" className="text-blue-500">Login</a>
                </p>
                <p className="mt-2">
                    <button className="bg-red-500 text-white rounded-lg px-4 py-2">
                        Register with Google
                    </button>
                </p>
            </form>
        </div>
    );
};

export default Register;