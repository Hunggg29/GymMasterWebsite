import React from 'react';
import { Link } from 'react-router-dom';
import {ButtonOutline} from "./";
import {exercisePng, planImg} from "../images";

const Plan = ({name, img, alt, p_id, price, durationInDays}) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 text-center h-full flex flex-col justify-between border border-gray-700 hover:border-indigo-500">
      <div>
        <div className="relative rounded-lg overflow-hidden aspect-w-16 aspect-h-9 mb-6 group">
          <img 
            src={img} 
            alt={name} 
            className="w-full h-48 object-cover object-top rounded-md transform hover:scale-105 transition-transform duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <h3 className="text-2xl font-extrabold mb-4 text-white group-hover:text-indigo-400 transition-colors duration-300">{name}</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-tag text-indigo-400"></i>
            <p className="text-lg">Price: <span className="font-bold text-indigo-400">${price}</span></p>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-calendar text-indigo-400"></i>
            <p className="text-lg">Duration: <span className="font-bold text-indigo-400">{durationInDays} days</span></p>
          </div>
        </div>
      </div>
      <Link 
        to={`/plan-detail/${p_id}`}
        className="mt-6 inline-block w-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 border border-indigo-500/50 hover:border-indigo-400 shadow-lg hover:shadow-indigo-500/30"
      >
        Select Plan
      </Link>
    </div>
  )
}

export default Plan;

