import { BASE_URL } from '../../utils/fetchData'
import React from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';

const User = ({ userImg, name, email, contact, i,fullname,id,onDelete }) => {
  const { auth } = useAuth();
  
  const handleRemove = async (e) =>{
    e.preventDefault(); 
    try{
      // Ask for confirmation using the browser's confirm dialog
      const isConfirmed = window.confirm("Are you sure you want to delete this user?");
      
      if (!isConfirmed) {
        return; // Exit if user cancels
      }

      const response = await axios.delete(`${BASE_URL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      
      // Backend returns 204 No Content on success
      if (response.status === 204) {
        toast.success('User deleted successfully');
        if (onDelete) {
          onDelete(); // Refresh the user list
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
    
    <div 
      key={i} 
      className='flex flex-col gap-6 justify-center items-center border-2 border-gray-200 rounded-lg p-6 transition-all ease-in-out duration-300 group shadow-md hover:shadow-lg hover:bg-gray-50 w-full max-w-lg mx-auto'
    >
      <h3 className='text-indigo-600 font-bold text-center text-2xl group-hover:text-indigo-800 transition-all ease-in-out'>
        {name}
      </h3>
      <img 
        src={userImg} 
        alt="User" 
        className='w-[100px] h-[100px] object-cover rounded-full border-4 border-gray-300 group-hover:scale-110 transition-transform duration-300' 
      />
      <div className='flex flex-col gap-4 w-full'>
        <p className='text-gray-700 text-md bg-indigo-100 rounded-lg p-3'>
          <span className='font-semibold text-indigo-600'>Email: </span>{email}
        </p>
        <p className='text-gray-700 text-md bg-teal-100 rounded-lg p-3'>
          <span className='font-semibold text-teal-600'>Contact: </span>{contact}
        </p>
        <p className='text-gray-700 text-md bg-pink-100 rounded-lg p-3'>
          <span className='font-semibold text-pink-600'>FullName: </span>{fullname}
        </p>

      </div>
      <div className="justify-end flex w-full">
       
        <button onClick={handleRemove}  class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Delete
        </button>
      </div>
    </div>
  );
}

export default User;
