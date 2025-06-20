// aos 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

 

    if (!/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordPattern.test(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number");
      return;
    }

  

    const phoneNumberPattern = /^(0)\d{9}$/;
    if (!phoneNumberPattern.test(phone)) {
      toast.error("Phone number must start with 0 and contain exactly 10 digits");
      return;
    }

    console.log(name, password, email, fullname, phone);

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/register`, {
        username: name,
        email,
        password,
        fullname,
        phone
      });
      if (res.data) {
        toast.success("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({    duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 120, // Trigger animation before the element comes into view
      once: true });
  }, []);

  return (
    <div className='bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form
          className='flex w-full h-screen justify-center items-center flex-col gap-5'
          onSubmit={onSubmit}
          data-aos="fade-up" // Add AOS animation
        >
          <h2 className='text-center text-4xl text-white font-bold'>Register</h2>

          <Input 
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            minLength="4"
            maxLength="30"
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="text"
            placeholder="FullName"
            name="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Input 
            type="text"
            placeholder="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            data-aos="zoom-in" // Add AOS animation
          />

          <Link to="/login" className='text-white opacity-85 font-medium' data-aos="fade-in">
            Already a registered user? <span className='underline text-blue-600 font-semibold'>Login</span>
          </Link>

          <button 
            type='submit' 
            className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'
            data-aos="slide-up" // Add AOS animation
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
