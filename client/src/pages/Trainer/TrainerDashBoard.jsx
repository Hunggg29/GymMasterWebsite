import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import { useAuth } from "../../context/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaUsers, FaCalendarCheck } from 'react-icons/fa';

const TrainerDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [sessioncount, setSessionCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      offset: 120,
      once: true
    });

    getUsers(auth.user.id);
    getSessions(auth.user.id);
  }, [auth]);
    
  const getUsers = async (id) => {
    try { 
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer/${id}/users`);
      setUserCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting users");
      setLoading(false);
    }
  }

  const getSessions = async (id) => {
    try { 
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer/${id}/sessions`);
      setSessionCount(Array.isArray(res.data) ? res.data.length : 0);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting sessions");
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader />
  }

  const dashboardItems = [
    {
      title: "Members",
      description: "View and manage your members",
      icon: <FaUsers className="text-4xl mb-4" />,
      count: userCount,
      path: "/dashboard/trainer/user-list"
    },
    {
      title: "Training Sessions",
      description: "Manage your training sessions",
      icon: <FaCalendarCheck className="text-4xl mb-4" />,
      count: sessioncount,
      path: "/dashboard/trainer/session-list"
    }
  ];

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10'>
      <Heading name="Trainer Dashboard" />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  );
}

export default TrainerDashBoard;
