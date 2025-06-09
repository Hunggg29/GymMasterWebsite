import React, { useState, useEffect } from 'react';
import { Heading } from ".";
import { Plan } from '.';
import axios from 'axios';
import { BASE_URL } from '../utils/fetchData';
import Loader from './Loader';
import {toast} from 'react-hot-toast';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-out-cubic',
      once: true,
      mirror: true
    });
  }, []);

  const getAllPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/plan`);
      if (res.data) {
        setPlans(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const animationDirections = ['fade-right', 'fade-up', 'fade-down', 'fade-left'];

  return (
    <div className="h-full">
      <div className="text-center mb-8" data-aos="fade-down" data-aos-delay="100">
        <h3 className="text-2xl font-bold text-white mb-2 hover:text-indigo-400 transition-colors duration-300">
          Training Plans
        </h3>
        <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
          Choose the perfect plan for your fitness journey
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.slice(0, 4).map((p, i) => (
          <div
            key={i}
            data-aos={animationDirections[i]}
            data-aos-delay={i * 200}
            data-aos-duration="1200"
            className="h-full transform hover:scale-105 transition-all duration-300 hover:z-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <Plan
                img={p.imageUrl} 
                alt={`plan-img-${i}`}
                name={p.name}
                p_id={p.id}
                price={p.price}
                durationInDays={p.durationInDays}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;









