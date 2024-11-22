import  { useState } from 'react';
import { useAuth } from '../utils/AuthContext'; // Import the AuthContext
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { handleLogout } = useAuth(); // Get the logout function from context
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to the user's email client with a mailto link
        window.location.href = `mailto:${email}?subject=Password Reset Request&body=Please click the link below to reset your password.`;
        handleLogout(); // Log out the user
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg w-full p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;