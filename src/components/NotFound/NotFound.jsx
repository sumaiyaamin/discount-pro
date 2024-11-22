
import { useNavigate } from 'react-router-dom';
import notFoundImage from '../../assets/not-found.jpg'; 

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); 
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <img src={notFoundImage} alt="Not Found" className="w-1/2 md:w-1/3 mb-4" />
            <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
            <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
            <button 
                onClick={handleGoHome} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go to Home
            </button>
        </div>
    );
};

export default NotFound;