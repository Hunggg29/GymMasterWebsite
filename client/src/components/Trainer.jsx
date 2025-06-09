import React from 'react';
import { trainerImg1,trainerImg2,trainerImg3,trainerImg4 } from '../images';
import { Link } from 'react-router-dom';

const Trainer = ({ img, alt, id, name, age, specialization, experience }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-700 hover:border-teal-500 group">
      <div className="relative overflow-hidden rounded-t-xl">
        <img 
          src={img} 
          alt={alt} 
          className="w-full h-[300px] object-cover transform group-hover:scale-105 transition-transform duration-500" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
      </div>
      <div className="p-6 text-center relative z-10">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-teal-400 transition-colors duration-300">{name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-birthday-cake text-teal-400"></i>
            <p className="text-gray-300">Age: <span className="text-white font-semibold group-hover:text-teal-400 transition-colors duration-300">{age}</span></p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-dumbbell text-teal-400"></i>
            <p className="text-gray-300">Experience: <span className="text-white font-semibold group-hover:text-teal-400 transition-colors duration-300">{experience} years</span></p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-star text-teal-400"></i>
            <p className="text-gray-300 group-hover:text-white transition-colors duration-300">{specialization}</p>
          </div>
        </div>
        <Link 
          to={`trainer/${id}`} 
          className="inline-block w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-teal-500/50 hover:border-teal-400 shadow-lg hover:shadow-teal-500/30"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default Trainer;