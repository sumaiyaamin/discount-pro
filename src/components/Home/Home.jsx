import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Slider from '../Slider/Slider'; 
import Marquee from 'react-fast-marquee'; 
import BrandCard from '../BrandCard/BrandCard'; 
import { useAuth } from '../utils/AuthContext'; 
import Accordion from '../Accordion/Accordion'; 
import 'animate.css'; 
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Home = () => {
    const { user } = useAuth(); 
    const navigate = useNavigate(); 
    const [couponsData, setCouponsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        AOS.init({ duration: 1000 });

        // Fetch JSON data
        fetch('/data/couponsData.json') 
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

  
    const brandsOnSale = couponsData.filter(brand => brand.isSaleOn);

    
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

    // User testimonials
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

    // FAQ data
    const faqs = [
        {
            question: "How do I use a coupon?",
            answer: "To use a coupon, simply copy the code and paste it at checkout on the retailer's website."
        },
        {
            question: "Are there any restrictions on coupons?",
            answer: "Yes, some coupons may have restrictions such as expiration dates or minimum purchase amounts."
        },
        {
            question: "Can I use multiple coupons?",
            answer: "Typically, you can only use one coupon per transaction, but it varies by retailer."
        },
        {
            question: "How often are new coupons added?",
            answer: "New coupons are added regularly, so check back often for the latest deals!"
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        ); 
    }

    
    const handleBrandClick = (brandId) => {
        if (user) {
            navigate(`/brand/${brandId}`); 
        } else {
            navigate('/login'); 
        }
    };

    return (
        <div className="container mx-auto p-4">
            {/* Welcome Message */}
            {user && (
                <div className="animate__animated animate__fadeInDown mb-4 text-center bg-purple-300 text-purple-900 p-4 rounded">
                    <h2 className="text-xl font-bold">Welcome, {user.displayName}!</h2>
                </div>
            )}

            {/* Banner with Slider */}
            <div className="mb-8">
                <div className="w-full h-64 md:h-80 lg:h-auto"> 
                    <Slider />
                </div>
            </div>

            {/* Top Brands Section */}
            <h2 className="text-2xl font-bold mb-4">Top Brands</h2>
            <Marquee pauseOnHover={true} speed={50}>
                {couponsData.map(brand => (
                    <div key={brand._id} className="flex items-center mx-4">
                        <img 
                            src={brand.brand_logo} 
                            alt={brand.brand_name} 
                            className="w-32 h-32 object-contain cursor-pointer" 
                            onClick={() => handleBrandClick(brand._id)} 
                        />
                    </div>
                ))}
            </Marquee>

            {/* Brands on Sale Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Brands on Sale</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brandsOnSale.map(brand => (
                    <div className="animate__animated animate__fadeInUp" key={brand._id} data-aos="fade-up">
                        <BrandCard brand={brand} /> 
                    </div>
                ))}
            </div>

            {/* Featured Coupons Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Featured Coupons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {featuredCoupons.map(coupon => (
                    <div key={coupon.id} className="border rounded-lg p-4 shadow-md animate__animated animate__fadeInUp" data-aos="fade-up">
                        <h3 className="text-lg font-semibold">{coupon.brand_name}</h3>
                        <p className="text-gray-600">Coupon Code: <strong>{coupon.coupon_code}</strong></p>
                        <p className="text-gray-600">{coupon.description}</p>
                        <p className="text-gray-500">Expires on: {coupon.expiry_date}</p>
                        <button className="mt-2 inline-block px-4 py-2 bg-purple-300 text-purple-900 rounded hover:bg-purple-400">
                            Copy Code
                        </button>
                    </div>
                ))}
            </div>

            {/* User Testimonials Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">What Our Users Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {testimonials.map(testimonial => (
                    <div key={testimonial.id} className="border rounded-lg p-4 shadow-md animate__animated animate__fadeInUp" data-aos="fade-up">
                        <p className="text-gray-600 italic">{testimonial.feedback}</p>
                        <p className="text-right font-semibold">- {testimonial.name}</p>
                    </div>
                ))}
            </div>

            {/* FAQ Section */}
            <h2 className="text-2xl font-bold mt-8 mb-4">Frequently Asked Questions</h2>
            <Accordion faqs={faqs} />
        </div>
    );
};

export default Home;