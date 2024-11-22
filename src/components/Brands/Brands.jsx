import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import couponsData from '/Pro-Hero/discount-pro/public/data/couponsData.json';
import { useAuth } from '../utils/AuthContext';

const Brands = () => {
    const [brandsData, setBrandsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        setBrandsData(couponsData);
    }, []);

    const filteredBrands = brandsData.filter(brand =>
        brand.brand_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Brands</h1>
            <input
                type="text"
                placeholder="Search for brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg p-2 mb-4 w-full"
            />
            <div className="grid grid-cols-1 gap-4">
                {filteredBrands.map(brand => (
                    <div key={brand._id} className="border rounded-lg p-4 shadow-md flex items-center">
                        <img src={brand.brand_logo} alt={brand.brand_name} className="w-16 h-16 object-contain mr-4" />
                        <div className="flex-grow">
                            <h3 className="text-lg font-semibold">{brand.brand_name}</h3>
                            <div className="flex items-center mb-2">
                                <FaStar className="text-yellow-500 mr-1" />
                                <span>{brand.rating}</span>
                            </div>
                            <p className="text-gray-600">{brand.description}</p>
                        </div>
                        <div className="flex flex-col items-end">
                            {brand.isSaleOn && (
                                <span className="text-red-500 font-bold animate-bounce">Sale is on!</span>
                            )}
                            <Link 
                                to={user ? `/brand/${brand._id}` : '/login'}
                                className="mt-2 inline-block px-4 py-2 bg-purple-400 text-white rounded hover:bg-blue-600"
                            >
                                View Coupons
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Brands;