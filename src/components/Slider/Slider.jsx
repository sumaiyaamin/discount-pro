import { useState } from 'react';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        {
            id: 1,
            image: 'https://i.ibb.co.com/MphVKT9/portrait-of-an-excited-beautiful.jpg',
            caption: 'Save big on your favorite brands!',
        },
        {
            id: 2,
            image: 'https://i.ibb.co/5cp5WWj/21de76124db5aece19ad7c92d2b24e31.jpg',
            caption: 'Exclusive discounts just for you!',
        },
        {
            id: 3,
            image: 'https://i.ibb.co.com/Rgtf3Th/big-sale-of-bags-r.jpg',
            caption: 'Find the best coupons and save money!',
        },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg border-4 border-lavender-300 shadow-lg">
            <div className="absolute inset-0 transition-opacity duration-500">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                            src={slide.image} 
                            alt={`Slide ${slide.id}`} 
                            className="w-full h-full object-cover rounded-lg" 
                        />
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                            <h2 className="text-xl">{slide.caption}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-300 text-purple-900 p-2 rounded-full"
            >
                &#10094; {/* Left Arrow */}
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-300 text-purple-900 p-2 rounded-full"
            >
                &#10095; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default Slider;