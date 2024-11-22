import { useState } from 'react';
import { useAuth } from '../utils/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const UpdateProfile = () => {
    const { user, updateUser } = useAuth(); 
    const [photoURL, setPhotoURL] = useState(user.photoURL);
    const [name, setName] = useState(user.displayName || user.name);
    const navigate = useNavigate();

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUser({ photoURL, displayName: name }) 
            .then(() => {
                toast.success("Profile updated successfully!", {
                    position: "top-center",
                    autoClose: 3000, 
                    hideProgressBar: true, 
                    closeOnClick: true, 
                    pauseOnHover: true, 
                    draggable: true, 
                    progress: undefined,
                });
                navigate('/my-profile'); 
            })
            .catch((error) => {
                console.error("Error updating user information:", error);
                toast.error("Error updating profile. Please try again.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer /> 
            <h1 className="text-2xl font-bold mb-4">Update Information</h1>
            <form onSubmit={handleUpdate} className="bg-white shadow-md rounded-lg p-6">
                <div className="mb-4">
                    <label className="block text-gray-700">Photo URL</label>
                    <input
                        type="text"
                        value={photoURL}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        className="border rounded-lg w-full p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded-lg w-full p-2"
                        required
                    />
                </div>
                <button type="submit" className="bg-purple-400 text-white rounded px-4 py-2 hover:bg-purple-600">
                    Update Information
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;