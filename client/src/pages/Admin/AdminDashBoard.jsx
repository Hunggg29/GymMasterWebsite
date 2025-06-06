import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader, Statistics } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUserTie, FaUsers, FaClipboardList, FaComments, FaDumbbell, FaBuilding, FaUserPlus } from 'react-icons/fa';
import AddStaffModal from '../../components/AddStaffModal';

const AdminDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [planCount, setPlanCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [trainerCount, setTrainerCount] = useState(null);
  const [gymroomCount, setGymroomCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      offset: 120,
      once: true
    });

    getUsers();
    getPlans();
    getSubscriptions();
    getContacts();
    getFeedbacks();
    getGymrooms();
    getTrainers();
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

  const getTrainers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer`);
      setTrainerCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting trainers");
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/users`);
      const response = res.data;
      const staff = response.filter(response => response.role=='staff')
      setUserCount(Array.isArray(staff) ? staff.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting users");
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
      title: "Staff",
      description: "Manage staff members",
      icon: <FaUserTie className="text-4xl mb-4" />,
      count: userCount,
      path: "/dashboard/admin/user-list"
    },
    {
      title: "Subscribers",
      description: "View all subscribers",
      icon: <FaUsers className="text-4xl mb-4" />,
      count: subscriberCount,
      path: "/dashboard/admin/subscriber-list"
    },
    {
      title: "Plans",
      description: "Manage training plans",
      icon: <FaClipboardList className="text-4xl mb-4" />,
      count: planCount,
      path: "/dashboard/admin/plans"
    },
    {
      title: "Feedbacks",
      description: "View customer feedbacks",
      icon: <FaComments className="text-4xl mb-4" />,
      count: feedbackCount,
      path: "/dashboard/admin/feedbacks"
    },
    {
      title: "Trainers",
      description: "Manage gym trainers",
      icon: <FaDumbbell className="text-4xl mb-4" />,
      count: trainerCount,
      path: "/dashboard/admin/trainers"
    },
    {
      title: "Gym Rooms",
      description: "Manage gym facilities",
      icon: <FaBuilding className="text-4xl mb-4" />,
      count: gymroomCount,
      path: "/dashboard/admin/gymrooms"
    }
  ];

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10'>
      <Heading name="Admin Dashboard" />
      <div className="container mx-auto px-6 py-12">
        {/* Add Staff Button */}
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setIsAddStaffModalOpen(true)}
            className="group px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 flex items-center space-x-2"
          >
            <FaUserPlus className="text-xl text-white" />
            <span className="text-white font-medium">Add New Staff</span>
          </button>
        </div>

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

        <div className="mt-12">
          <Statistics />
        </div>

        <AddStaffModal
          isOpen={isAddStaffModalOpen}
          onClose={() => setIsAddStaffModalOpen(false)}
          onSuccess={() => {
            setIsAddStaffModalOpen(false);
            getUsers(); // Refresh staff count
          }}
        />
      </div>
    </section>
  )
}

export default AdminDashBoard;
