import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
    return (
        <div className="border-b">
            <div 
                className="flex justify-between items-center p-4 cursor-pointer bg-purple-200 hover:bg-purple-300 transition-colors duration-300"
                onClick={onToggle}
            >
                <h3 className="text-lg font-semibold">{question}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && (
                <div className="p-4 bg-purple-100">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

// Prop validation for AccordionItem
AccordionItem.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
};

const Accordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="rounded-lg shadow-md">
            {faqs.map((faq, index) => (
                <AccordionItem 
                    key={index} 
                    question={faq.question} 
                    answer={faq.answer} 
                    isOpen={openIndex === index} 
                    onToggle={() => handleToggle(index)} 
                />
            ))}
        </div>
    );
};

// Prop validation for Accordion
Accordion.propTypes = {
    faqs: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string.isRequired,
            answer: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Accordion;