import  { useContext } from 'react';
import PropTypes from 'prop-types'; 
import { AuthContext } from '../utils/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation(); 

  
    if (loading) {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-4 w-20"></div>
                        <div className="skeleton h-4 w-28"></div>
                    </div>
                </div>
                <div className="skeleton h-32 w-full"></div>
            </div>
        );
    }

    // If the user is not authenticated, redirect to the login page
    if (!user) {
        return <Navigate state={{ from: location }} to='/login' replace />;
    }

    
    return children;
};


PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired, 
};

export default PrivateRoute;