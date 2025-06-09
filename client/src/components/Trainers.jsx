import React, { useEffect } from 'react';
import { Trainer } from '.';
import { trainerImg1, trainerImg2, trainerImg3, trainerImg4 } from "../images";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Trainers = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-out-cubic',
      once: true,
      mirror: true
    });
  }, []);

  const trainersData = [
    {
      img: trainerImg1,
      name: "John Smith",
      age: "35",
      specialization: "Strength Training Expert",
      experience: "10",
      id: "1"
    },
    {
      img: trainerImg2,
      name: "Sarah Wilson",
      age: "28",
      specialization: "Yoga & Pilates Specialist",
      experience: "6",
      id: "2"
    },
    {
      img: trainerImg3,
      name: "Mike Johnson",
      age: "42",
      specialization: "CrossFit Master",
      experience: "15",
      id: "3"
    },
    {
      img: trainerImg4,
      name: "Emily Davis",
      age: "31",
      specialization: "Cardio & HIIT Expert",
      experience: "8",
      id: "4"
    }
  ];

  const animationDirections = ['zoom-in-right', 'zoom-in-up', 'zoom-in-down', 'zoom-in-left'];

  return (
    <div className="h-full">
      <div className="text-center mb-8" data-aos="fade-down" data-aos-delay="100">
        <h3 className="text-2xl font-bold text-white mb-2 hover:text-indigo-400 transition-colors duration-300">
          Expert Trainers
        </h3>
        <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
          Meet our professional fitness experts
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trainersData.map((trainer, i) => (
          <div
            key={i}
            data-aos={animationDirections[i]}
            data-aos-delay={i * 200}
            data-aos-duration="1200"
            className="h-full transform hover:scale-105 transition-all duration-300 hover:z-10"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
              <Trainer
                img={trainer.img}
                alt={`trainer-${i + 1}`}
                id={trainer.id}
                name={trainer.name}
                age={trainer.age}
                specialization={trainer.specialization}
                experience={trainer.experience}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;


