import { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
       
        console.log(`Subscribed with email: ${email}`);
        setEmail(''); 
    };

    return (
        <footer className="bg-gradient-to-r from-purple-200 to-purple-300 p-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Company Information Column */}
               <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Discount Pro</h2>
                    <p className="text-center text-gray-700 mb-2">Your one-stop solution for the best discounts and deals.</p>
                    <p className="text-center text-gray-700">© {new Date().getFullYear()} Discount Pro. All rights reserved.</p>
                    <a href="/my-profile" className="mt-2 text-blue-500 hover:underline">My Profile</a>
                </div>
                {/* Social Links Column */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-600">
                            <FaFacebook size={30} />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400">
                            <FaTwitter size={30} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-500">
                            <FaInstagram size={30} />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700">
                            <FaLinkedin size={30} />
                        </a>
                    </div>
                </div>

                {/* Subscription Column */}
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                    <form onSubmit={handleSubscribe} className="flex flex-col items-center">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-lg p-2 mb-2 w-full max-w-xs"
                            required
                        />
                        <button type="submit" className="bg-purple-500 text-white rounded-lg px-4 py-2 w-full max-w-xs">
                            Subscribe
                        </button>
                    </form>
                </div>

              
            </div>
        </footer>
    );
};

export default Footer;