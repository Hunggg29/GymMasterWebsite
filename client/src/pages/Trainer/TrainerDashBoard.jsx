  import React, { useContext, useEffect, useState } from 'react';
  import { Link } from 'react-router-dom';
  import axios from "axios";
  import { Heading, Loader } from '../../components';
  import { toast } from "react-hot-toast";
  import { BASE_URL } from "../../utils/fetchData";
  import { useAuth } from "../../context/auth";
  import AOS from 'aos';
  import 'aos/dist/aos.css'; // Import AOS styles

  const TrainerDashBoard = () => {
    const [userCount, setUserCount] = useState(null);
    const [planCount, setPlanCount] = useState(null);
    const [subscriberCount, setSubscriberCount] = useState(null);
    const [contactCount, setContactCount] = useState(null);
    const [feedbackCount, setFeedbackCount] = useState(null);
    const [loading, setLoading] = useState(false);
    const { auth, setAuth } = useAuth();
    // AOS Initialization
    useEffect(() => {

      AOS.init({
        duration: 1000, // Animation duration in milliseconds
        easing: 'ease-in-out', // Animation easing
        offset: 120, // Trigger animation before the element comes into view
        once: true // Animation should happen only once while scrolling down
      });

      // Fetch data
      getUsers(auth.user.id);
      
    }, [auth]);
    
    const getUsers = async (id) => {
      try { 
        console.log('auth la',auth)
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

   

    if (loading) {
      return <Loader />
    }

    return (
      <section className='pt-10 bg-gray-900'>
        <Heading name="Trainer Dashboard" />
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/staff/user-list`} data-aos="fade-up">
              <h2 className='text-white font-bold text-3xl'>Member: {userCount !== null ? userCount : "Loading..."}</h2>
            </Link>
          
            {/* <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/staff/plans`} data-aos="fade-up" data-aos-delay="200">
              <h2 className='text-white font-bold text-3xl'>Plans: {planCount !== null ? planCount : "Loading..."}</h2>
            </Link> */}
            
            {feedbackCount !== null && (
              <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/staff/feedbacks`} data-aos="fade-up" data-aos-delay="400">
                <h2 className='text-white font-bold text-3xl'>Feedbacks: {feedbackCount !== null ? feedbackCount : "Loading..."}</h2>
              </Link>
            )}
          </div>
        </div>
      </section>
    )
  }

  export default TrainerDashBoard;
