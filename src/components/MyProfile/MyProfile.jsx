import { useAuth } from '../utils/AuthContext'; // Import the AuthContext
import { Link } from 'react-router-dom';

const MyProfile = () => {
    const { user } = useAuth(); // Get user information from context

    return (
        <div className="container mx-auto p-4">
            {/* Cover Section */}
            <div className="relative">
                <div className="h-48 bg-gradient-to-r from-purple-400 to-blue-300 animate-gradient bg-cover bg-center">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>
                <h1 className="text-3xl font-bold text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    Welcome, {user.displayName || user.name}!
                </h1>
            </div>

            {/* User Information Card */}
            <div className="mt-6 flex justify-center">
                <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                    <div className="flex items-center">
                        <img src={user.photoURL} alt="User" className="w-24 h-24 rounded-full border-2 border-gray-300" />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">{user.displayName || user.name}</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                    </div>
                    <Link to="/my-profile/update" className="mt-4 inline-block px-4 py-2 text-center items-center bg-purple-500 text-white rounded hover:bg-blue-600">
                        Update Information
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;