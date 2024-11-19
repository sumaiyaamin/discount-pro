import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Slider from '../../components/Slider/Slider'; 
import Marquee from 'react-fast-marquee'; 
import BrandCard from '../../components/BrandCard/BrandCard'; 
const Home = () => {
    const [couponsData, setCouponsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //  JSON data 
        fetch('/couponsData.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCouponsData(data); 
                setLoading(false); 
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); 
            });
    }, []);

    // Filter brands that are currently on sale
    const brandsOnSale = couponsData.filter(brand => brand.isSaleOn);

    // Static data for featured coupons
    const featuredCoupons = [
        {
            id: 1,
            coupon_code: "SAVE50",
            description: "Get $50 off on your first purchase at TechZone!",
            expiry_date: "2023-12-31",
            brand_name: "TechZone",
        },
        {
            id: 2,
            coupon_code: "FASHION20",
            description: "20% off on all fashion items at FashionHub!",
            expiry_date: "2023-11-30",
            brand_name: "FashionHub",
        },
        {
            id: 3,
            coupon_code: "BOOK10",
            description: "10% off on all books at BookNook!",
            expiry_date: "2023-12-15",
            brand_name: "BookNook",
        },
    ];

    //  user testimonials
    const testimonials = [
        {
            id: 1,
            name: "Alice Johnson",
            feedback: "Discount PRO has saved me so much money on my online shopping! Highly recommend!",
        },
        {
            id: 2,
            name: "Mark Smith",
            feedback: "I love how easy it is to find coupons for my favorite brands. Great app!",
        },
        {
            id: 3,
            name: "Sarah Brown",
            feedback: "The user interface is so friendly, and I found amazing deals in minutes!",
        },
    ];

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className="container mx-auto p-4">
            {/* Banner with Slider */}
            <div className="mb-8">
                <Slider />
            </div>

            {/* Top Brands Section */}
            <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
            <Marquee pauseOnHover={true} speed={50}>
                {couponsData.map(brand => (
                    <div key={brand._id} className="flex items-center mx-4">
                        <Link to={`/brands/${brand._id}`}>
                            <img 
                                src={brand.brand_logo} 
                                alt={brand.brand_name} 
                                className="w-32 h-32 object-contain" 
                            />
                        </Link>
                    </div>
                ))}
            </Marquee>

            {/* Brands on Sale Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Brands on Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brandsOnSale.map(brand => (
                    <BrandCard key={brand._id} brand={brand} /> // Use BrandCard component
                ))}
            </div>

            {/* Featured Coupons Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Featured Coupons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {featuredCoupons.map(coupon => (
                    <div key={coupon.id} className="border rounded-lg p-4 shadow-md">
                        <h3 className="text-lg font-semibold">{coupon.brand_name}</h3>
                        <p className="text-gray-600">Coupon Code: <strong>{coupon.coupon_code}</strong></p>
                        <p className="text-gray-600">{coupon.description}</p>
                        <p className="text-gray-500">Expires on: {coupon.expiry_date}</p>
                        <button className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                            Copy Code
                        </button>
                    </div>
                ))}
            </div>

            {/* User Testimonials Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="border rounded-lg p-4 shadow-md">
                        <p className="text-gray-600 italic"> `{testimonial.feedback}`</p>
                        <p className="text-right font-semibold">- {testimonial.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;