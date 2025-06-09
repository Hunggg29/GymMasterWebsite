// aos
import React, { useEffect, useState } from 'react';
import { Heading, FaqComponent } from ".";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What are your operating hours?",
      answer: "We are open 24/7, allowing our members to work out at their convenience."
    },
    {
      question: "Do you offer personal training?",
      answer: "Yes, we have certified personal trainers available for one-on-one sessions. You can book sessions through our front desk or mobile app."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial for new members to experience our facilities and classes."
    },
    {
      question: "What types of classes do you offer?",
      answer: "We offer a wide variety of classes including yoga, HIIT, spinning, strength training, and more. Check our schedule for timings."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({
      duration: 1200,       // Duration of the animation
      offset: 100,          // Delay the animation until the element is in the viewport
      easing: 'ease-in-out', // Controls the smoothness of the animation
      once: true,           // Whether animation should happen only once
      mirror: false         // Whether elements should animate out while scrolling past them
    });
  }, []);

  return (
    <section className='pt-10 relative'>
      <Heading name="Frequently Asked Questions" />

      <div className="container mx-auto py-10 px-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Common Questions</h3>
          <p className="text-gray-400">Find answers to frequently asked questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left bg-gray-700/50 hover:bg-gray-700/70 transition-colors duration-200 flex justify-between items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-white font-medium">{faq.question}</span>
                <i className={`fas fa-chevron-down text-indigo-400 transition-transform duration-200 ${activeIndex === index ? 'transform rotate-180' : ''}`}></i>
              </button>
              <div 
                className={`px-6 overflow-hidden transition-all duration-200 ${
                  activeIndex === index ? 'max-h-40 py-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-amber-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default FAQ;

