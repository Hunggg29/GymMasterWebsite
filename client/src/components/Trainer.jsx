import { BASE_URL } from '../utils/fetchData';
import React from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Mail, Phone, Award } from 'lucide-react';

const Trainer = ({ userImg, name, email, contact, i, id, onDelete, experience, PricePerHour, specialty }) => {
  const { auth } = useAuth();

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");

      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(`${BASE_URL}/api/Trainer/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });


      if (response.status === 204) {
        toast.success('User deleted successfully');
        if (onDelete) {
          onDelete();
        }
      } else {
        toast.error('Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error(error.response?.data?.message || 'Error deleting user');
    }
  }
  return (
       <div className="group relative max-w-md mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700"></div>
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 border border-white/20 group-hover:border-white/40 transform hover:-translate-y-3 hover:rotate-1">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-pink-200/30 to-orange-200/30 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700 delay-150"></div>
        <div className="relative flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            <img
              src={userImg}
              alt={name}
              className="relative w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
            />
          </div>

          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
            {name}
          </h3>
          <p className="text-sm font-medium text-gray-500 group-hover:text-blue-500 transition-colors duration-300 mt-1">
            {specialty}
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 group/item hover:bg-blue-50/50 rounded-lg p-2 -m-2 transition-all duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Email</p>
              <p className="text-sm font-medium text-gray-800 truncate group-hover/item:text-blue-600 transition-colors duration-300">
                {email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group/item hover:bg-purple-50/50 rounded-lg p-2 -m-2 transition-all duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
              <Phone className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Phone</p>
              <p className="text-sm font-medium text-gray-800 group-hover/item:text-purple-600 transition-colors duration-300">
                {contact}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 group/item hover:bg-orange-50/50 rounded-lg p-2 -m-2 transition-all duration-300">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">
              <Award className="w-4 h-4 text-orange-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Experience</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-orange-600 bg-gradient-to-r from-orange-100 to-yellow-100 px-3 py-1 rounded-full group-hover/item:scale-105 transition-transform duration-300">
                  {experience} year
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Trainer;
