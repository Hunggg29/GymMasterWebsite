import React, { useEffect, useState } from 'react';
import Heading from './Heading';
import Trainer from './Trainer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { userImg } from '../images';
import { BASE_URL } from '../utils/fetchData';
import { trainerImg1,trainerImg2,trainerImg3,trainerImg4 } from '../images';
const trainerImages = [trainerImg1, trainerImg2, trainerImg3, trainerImg4];

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 2000, offset: -200, easing: "ease-in-out" });

    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/Trainer`);
        setTrainers(response.data);
      } catch (error) {
        console.error("Error fetching trainers:", error);
      }
    };

    fetchTrainers();
  }, []);

  const handleDelete = async () => {
    await getTrainers();
  };

  return (
    <section className='pt-10 relative'>
      <Heading name="Our Trainers" />
      <div className="container py-16 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.slice(0, 4).map((tr, i) => (
            <div key={tr._id || i} data-aos="fade-up" data-aos-delay={i * 200}>
              <Trainer
                key={i}
                id={tr.trainerId}
                userId={tr.userId}
                name={tr.user?.username}
                userImg={trainerImages[i]}
                email={tr.user?.email}
                contact={tr.user?.phone}
                specialty={tr.specialty}
                experience={tr.experience}
                PricePerHour={tr.pricePerHour}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800 to-green-300 opacity-80 pointer-events-none z-[-1]"></div>
    </section>
  );
};

export default Trainers;
