import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

const BrandCard = ({ brand }) => {
    return (
        <div className="border rounded-lg p-4 shadow-md bg-gradient-to-r from-purple-200 to-purple-300 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <img 
                src={brand.brand_logo} 
                alt={brand.brand_name} 
                className="w-full h-32 object-contain mb-2" 
            />
            <h3 className="text-lg font-semibold">{brand.brand_name}</h3>
            <p className="text-gray-600">Total Coupons: {brand.coupons.length}</p>
            <p className="text-gray-600">Category: {brand.category}</p>
            <Link to={`/brands/${brand._id}`} className="mt-2 inline-block px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500">
                View Coupons
            </Link>
        </div>
    );
};

BrandCard.propTypes = {
    brand: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        brand_name: PropTypes.string.isRequired,
        brand_logo: PropTypes.string.isRequired,
        coupons: PropTypes.arrayOf(PropTypes.object).isRequired,
        category: PropTypes.string.isRequired,
    }).isRequired,
};

export default BrandCard;