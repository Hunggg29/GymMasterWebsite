import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { FaUser,FaUsers, FaComments, FaDumbbell, FaBuilding, FaCalendarCheck } from 'react-icons/fa';

const StaffDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [planCount, setPlanCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [gymroomCount, setGymroomCount] = useState(null);
  const [trainingSession, setTrainingSessionCount] = useState(null);

  // AOS Initialization
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 120, // Trigger animation before the element comes into view
      once: true // Animation should happen only once while scrolling down
    });

    // Fetch data
    getUsers();
    getPlans();
    getSubscriptions();
    //getContacts();
    getTrainingSession();
    getFeedbacks();
    getGymrooms();
  }, []);

  const getGymrooms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/GymRoom`);
      setGymroomCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting gymrooms");
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Subscription`);
      setUserCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting users");
      setLoading(false);
    }
  }
  
  const getTrainingSession = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/TrainingSession`);
      setTrainingSessionCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting Training Sessions");
      setLoading(false);
    }
  }

  const getPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/plan`);
      setPlanCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting plans");
      setLoading(false);
    }
  }

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/subscription`);
      setSubscriberCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting subscription");
      setLoading(false);
    }
  }

  const getContacts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/contact`);
      setContactCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting contact");
      setLoading(false);
    }
  }

  const getFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/feedback`);
      setFeedbackCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting feedback");
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />
  }

  const dashboardItems = [
     {
          title: "Profile",
          description: "Update your personal information",
          icon: <FaUser className="text-4xl mb-4" />,
          path: "/dashboard/staff/profile"
        },
    {
      title: "Subscribers",
      description: "View and manage subscribers",
      icon: <FaUsers className="text-4xl mb-4" />,
      count: userCount,
      path: "/dashboard/staff/user-list"
    },
    {
      title: "Feedbacks",
      description: "View customer feedbacks",
      icon: <FaComments className="text-4xl mb-4" />,
      count: feedbackCount,
      path: "/dashboard/staff/feedbacks"
    },

    {
      title: "Training Sessions",
      description: "Manage training sessions",
      icon: <FaCalendarCheck className="text-4xl mb-4" />,
      count: trainingSession,
      path: "/dashboard/staff/sessions"
    },
    {
      title: "Gym Rooms",
      description: "View and manage gym facilities",
      icon: <FaBuilding className="text-4xl mb-4" />,
      count: gymroomCount,
      path: "/dashboard/staff/gymrooms"
    }
  ];

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10'>
      <Heading name="Staff Dashboard" />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <Link 
              key={index}
              className='group p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1' 
              to={item.path}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-blue-500 group-hover:text-blue-400 transition-colors">
                  {item.icon}
                </div>
                <h2 className='text-white font-bold text-2xl mb-2 group-hover:text-blue-400 transition-colors'>
                  {item.title}
                </h2>
                <p className='text-gray-400 group-hover:text-gray-300 transition-colors mb-3'>
                  {item.description}
                </p>
                <div className="text-3xl font-bold text-blue-500 group-hover:text-blue-400 transition-colors">
                  {item.count !== null ? item.count : "..."}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StaffDashBoard;
