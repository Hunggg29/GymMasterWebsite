// aos
import React, { useEffect } from 'react';
import { Heading, FaqComponent } from ".";
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQ = () => {
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
        <div className="flex flex-col">
          <div data-aos="fade-up">
            <FaqComponent
              question="How To SignUp And Login?"
              answer="To sign up, click the 'Sign Up' button on the top right corner of our website. Fill in your details including name, email, and password. Once registered, you can login using your email and password. If you forget your password, use the 'Forgot Password' option to reset it."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="100">
            <FaqComponent
              question="What Is The Fees Of The Plans?"
              answer="We offer various membership plans to suit your needs. Basic plan starts at $29.99/month, Premium plan at $49.99/month, and Elite plan at $79.99/month. Each plan includes different features and access levels. Corporate and student discounts are available."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <FaqComponent
              question="Is The Fees Refundable?"
              answer="Yes, we offer a 7-day money-back guarantee if you're not satisfied with our services. After this period, refunds are processed on a case-by-case basis. Membership cancellation requires a 30-day notice, and any unused prepaid amounts will be refunded."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <FaqComponent
              question="Is It Reliable To Buy Our Packs?"
              answer="Absolutely! We are a licensed and certified fitness center with years of experience. Our training packs are designed by certified fitness professionals and come with a satisfaction guarantee. We have thousands of satisfied members and maintain high safety and quality standards."
            />
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <FaqComponent
              question="How Much Time Does It Take to Complete A Pack?"
              answer="Training pack duration varies based on your goals and commitment. Most of our fitness packs are designed for 12 weeks, with 3-4 sessions per week. However, results may vary depending on individual dedication, consistency, and adherence to the program guidelines."
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-amber-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default FAQ;

