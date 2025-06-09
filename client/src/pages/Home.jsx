import React, { useEffect, useState } from 'react';
import { Hero, Plans, Trainers, Reviews, FAQ } from '../components';
import Contact from "./Contact";
import About from './About';
import { useAuth } from '../context/auth';

const Home = () => {
  const { auth, setAuth } = useAuth();
  const [activeSection, setActiveSection] = useState('hero');
  const [isNavHovered, setIsNavHovered] = useState(false);
  
  useEffect(() => {
    window.scrollTo({top:0, left:0, behavior:"smooth"});
    
    // Add scroll event listener to update active section
    const handleScroll = () => {
      const sections = ['hero', 'plans', 'trainers', 'testimonials', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setActiveSection(sectionId);
  };

  const navItems = [
    { id: 'hero', icon: 'fas fa-home', label: 'Home' },
    { id: 'plans', icon: 'fas fa-dumbbell', label: 'Plans' },
    { id: 'trainers', icon: 'fas fa-users', label: 'Trainers' },
    { id: 'testimonials', icon: 'fas fa-star', label: 'Reviews' },
    { id: 'contact', icon: 'fas fa-envelope', label: 'Contact' }
  ];

  return (
    <div className="bg-gray-900">
      {/* Fixed Navigation */}
      <nav 
        className="fixed left-6 top-1/2 transform -translate-y-1/2 z-40"
        onMouseEnter={() => setIsNavHovered(true)}
        onMouseLeave={() => setIsNavHovered(false)}
      >
        <div className="bg-gray-800/90 backdrop-blur-sm p-3 rounded-2xl border border-gray-700 shadow-lg shadow-black/20">
          <ul className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button 
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full px-4 py-3 rounded-xl transition-all duration-300 flex items-center group
                    ${activeSection === item.id 
                      ? 'bg-indigo-600 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                >
                  <i className={`${item.icon} text-lg group-hover:scale-110 transition-transform duration-300
                    ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`}></i>
                  <span className={`ml-3 text-sm font-medium transition-all duration-300 whitespace-nowrap
                    ${isNavHovered ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0'}
                    ${activeSection === item.id ? 'text-white' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <Hero/>
      </section>
      
      {/* Plans Section */}
      <section id="plans" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Plans</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        
        <div className="w-full">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
            <Plans />
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Our Expert Trainers</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        
        <div className="w-full">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
            <Trainers />
          </div>
        </div>
      </section>

      {/* Reviews and FAQ Section */}
      <section id="testimonials" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">What People Say</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="h-full">
              <Reviews/>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="h-full">
              <FAQ/>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact/>
      </section>
    </div>
  )
}

export default Home;