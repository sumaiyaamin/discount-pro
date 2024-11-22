import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import { CopyToClipboard } from 'react-copy-to-clipboard';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CouponPage = () => {
    const { id } = useParams(); // Get the brand ID from the URL parameters
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                // Fetch the coupons data from the JSON file
                const response = await fetch('/data/couponsData.json');
                const data = await response.json();

                // Find the brand by ID
                const foundBrand = data.find((b) => b._id === id); // Assuming each brand has a unique ID

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
            position: "top-center", // Position of the toast
            autoClose: 3000, // Duration before the toast disappears
            hideProgressBar: true, // Hide the progress bar
            closeOnClick: true, // Close on click
            pauseOnHover: true, // Pause on hover
            draggable: true, // Allow dragging
            progress: undefined, // No progress
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
        return <div>Loading...</div>; // Show loading state
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
                    <a href={brand.shop_Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Shop Now
                    </a>
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
                                <a href={brand.shop_Link} target="_blank" rel="noopener noreferrer" className="bg-purple-300 text-white rounded-lg px-4 py-2">
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