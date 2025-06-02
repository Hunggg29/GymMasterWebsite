import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading } from '../../components';
import { useAuth } from "../../context/auth";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaDumbbell, FaHeart, FaUser, FaComments, FaCalendarAlt } from 'react-icons/fa';

const UserDashBoard = () => {
  const { auth } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const dashboardItems = [
    {
      title: "Plan Detail",
      description: "View and manage your training plans",
      icon: <FaDumbbell className="text-4xl mb-4" />,
      path: "/dashboard/user/plan-detail"
    },
    {
      title: "Training Sessions",
      description: "View Your Sessions",
      icon: <FaHeart className="text-4xl mb-4" />,
      path: "/dashboard/user/training-sessions"
    },
    {
      title: "Profile",
      description: "Update your personal information",
      icon: <FaUser className="text-4xl mb-4" />,
      path: "/dashboard/user/profile"
    },
    {
      title: "Feedbacks",
      description: "View and manage your feedback",
      icon: <FaComments className="text-4xl mb-4" />,
      path: "/dashboard/user/feedbacks"
    },
    {
      title: "Register Training",
      description: "Book your training sessions",
      icon: <FaCalendarAlt className="text-4xl mb-4" />,
      path: "/dashboard/user/register-training"
    }
  ];

  return (
    <section className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-10'>
      <Heading name="User Dashboard" />
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
                <p className='text-gray-400 group-hover:text-gray-300 transition-colors'>
                  {item.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UserDashBoard;
