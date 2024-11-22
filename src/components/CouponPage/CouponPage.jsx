import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-toastify/dist/ReactToastify.css'; 

const CouponPage = () => {
    const { id } = useParams(); 
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
               
                const response = await fetch('/data/couponsData.json');
                const data = await response.json();

                // Find the brand by ID
                const foundBrand = data.find((b) => b._id === id); 

                if (foundBrand) {
                    setBrand(foundBrand);
                } else {
                    console.error('Brand not found');
                }
            } catch (error) {
                console.error('Error fetching brand data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBrandData();
    }, [id]);

    const handleCopy = (code) => {
        toast.success(`Copied: ${code}`, {
            position: "top-center", 
            autoClose: 3000, 
            hideProgressBar: true, 
            closeOnClick: true, 
            pauseOnHover: true, 
            draggable: true, 
            progress: undefined,
        });
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={`text-yellow-500 ${i < rating ? 'fas fa-star' : 'far fa-star'}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        ); 
    }

    return (
        <div className="container mx-auto p-4">
            <ToastContainer /> {/* Add ToastContainer for notifications */}
            {brand && (
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold">{brand.brand_name}</h1>
                    <img src={brand.brand_logo} alt={brand.brand_name} className="w-32 h-32 mx-auto" />
                    <div className="flex justify-center mb-2">
                        {renderStars(Math.round(brand.rating))}
                    </div>
                    <p className="text-lg">{brand.description}</p>
                
                </div>
            )}
            {brand && brand.coupons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {brand.coupons.map((coupon, index) => (
                        <div key={index} className="border rounded-lg p-4 shadow-md transition-transform duration-300 hover:scale-105">
                            <h3 className="text-lg font-semibold">Code: {coupon.coupon_code}</h3>
                            <p className="text-gray-600">{coupon.description}</p>
                            <p className="text-gray-500">Expires on: {coupon.expiry_date}</p>
                            <p className="text-gray-500">Condition: {coupon.condition}</p>
                            <div className="flex justify-between mt-2">
                                <CopyToClipboard text={coupon.coupon_code} onCopy={() => handleCopy(coupon.coupon_code)}>
                                    <button className="bg-purple-500 text-white rounded-lg px-4 py-2">
                                        Copy Code
                                    </button>
                                </CopyToClipboard>
                                <a href={brand.shop_Link} target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white rounded-lg px-4 py-2">
                                    Use Now
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No coupons available for this brand.</p>
            )}
        </div>
    );
};

export default CouponPage;