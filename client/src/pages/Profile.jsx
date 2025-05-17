import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';
import { Heading, Loader } from '../components';

const Profile = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    birthday: '',
    fullName: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (auth?.user) {
      const { username, email, birthday, fullName, phone } = auth.user;
      setProfileData({
        username: username || '',
        email: email || '',
        birthday: birthday && birthday !== '0001-01-01T00:00:00' 
          ? new Date(birthday).toISOString().split('T')[0] 
          : '',
        fullName: fullName || '',
        phone: phone || ''
      });
    }
  }, [auth]);

  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters';
    if (username.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username can only contain letters, numbers and underscores';
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate username as user types
    if (name === 'username') {
      const error = validateUsername(value);
      if (error) {
        setErrors(prev => ({
          ...prev,
          username: error
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username before submission
    const usernameError = validateUsername(profileData.username);
    if (usernameError) {
      setErrors(prev => ({
        ...prev,
        username: usernameError
      }));
      toast.error(usernameError);
      return;
    }

    setLoading(true);
    try {
      // Format the data according to the DTO
      const formattedData = {
        username: profileData.username,
        email: profileData.email,
        birthday: profileData.birthday ? new Date(profileData.birthday).toISOString() : null,
        fullName: profileData.fullName || null,
        phone: profileData.phone || null
      };

      const response = await axios.put(
        `${BASE_URL}/api/auth/profile`,
        formattedData,
        {
          headers: {
            'Authorization': `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        // Update the auth context with the new user data
        setAuth(prev => ({
          ...prev,
          user: response.data
        }));
        toast.success('Profile updated successfully!');
        navigate("/");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error.response?.data || 'Failed to update profile';
      if (typeof errorMessage === 'string') {
        toast.error(errorMessage);
      } else {
        toast.error('Failed to update profile');
      }
      
      if (errorMessage === 'Username already exists') {
        setErrors(prev => ({
          ...prev,
          username: 'Username already taken'
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!auth.user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading name="Profile Settings" />
          <p className="text-gray-400 text-lg mt-2">Update your personal information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-lg font-medium text-gray-200 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-lg border px-4 py-3 text-lg
                  ${errors.username 
                    ? 'border-red-500 bg-red-50/10' 
                    : 'border-gray-600 bg-gray-700'} 
                  text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition duration-150 ease-in-out`}
                placeholder="Enter username"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-lg
                  text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition duration-150 ease-in-out opacity-75"
                disabled
              />
              <p className="mt-2 text-sm text-gray-400">Email cannot be changed</p>
            </div>

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={profileData.fullName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-lg
                  text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition duration-150 ease-in-out"
                placeholder="Enter your full name"
              />
            </div>

            {/* Birthday */}
            <div>
              <label htmlFor="birthday" className="block text-lg font-medium text-gray-200 mb-2">
                Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={profileData.birthday}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-lg
                  text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition duration-150 ease-in-out"
                min="1900-01-01"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-3 text-lg
                  text-white shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  transition duration-150 ease-in-out"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-700">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                focus:ring-offset-gray-900 transition duration-150 ease-in-out
                transform hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;

