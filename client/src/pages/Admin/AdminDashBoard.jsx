import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Heading, Loader } from '../../components';
import { toast } from "react-hot-toast";
import { BASE_URL } from "../../utils/fetchData";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const AdminDashBoard = () => {
  const [userCount, setUserCount] = useState(null);
  const [planCount, setPlanCount] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [contactCount, setContactCount] = useState(null);
  const [feedbackCount, setFeedbackCount] = useState(null);
  const [trainerCount, setTrainerCount] = useState(null);
  const [gymroomCount, setGymroomCount] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setUserCount(Array.isArray(res.data) ? res.data.length : 0);
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

  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Admin Dashboard" />
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/user-list`} data-aos="fade-up">
            <h2 className='text-white font-bold text-3xl'>Users: {userCount !== null ? userCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/subscriber-list`} data-aos="fade-up" data-aos-delay="100">
            <h2 className='text-white font-bold text-3xl'>Subscribers: {subscriberCount !== null ? subscriberCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/plans`} data-aos="fade-up" data-aos-delay="200">
            <h2 className='text-white font-bold text-3xl'>Plans: {planCount !== null ? planCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/contact-us`} data-aos="fade-up" data-aos-delay="300">
            <h2 className='text-white font-bold text-3xl'>Queries: {contactCount !== null ? contactCount : "Loading..."}</h2>
          </Link>
          {feedbackCount !== null && (
            <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/feedbacks`} data-aos="fade-up" data-aos-delay="400">
              <h2 className='text-white font-bold text-3xl'>Feedbacks: {feedbackCount !== null ? feedbackCount : "Loading..."}</h2>
            </Link>
          )}
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/trainers`} data-aos="fade-up" data-aos-delay="300">
            <h2 className='text-white font-bold text-3xl'>Trainer: {trainerCount !== null ? trainerCount : "Loading..."}</h2>
          </Link>
          <Link className='p-5 border border-white hover:bg-blue-600 transition-all' to={`/dashboard/admin/gymrooms`} data-aos="fade-up" data-aos-delay="300">
            <h2 className='text-white font-bold text-3xl'>GymRoom: {gymroomCount !== null ? gymroomCount : "Loading..."}</h2>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AdminDashBoard;
