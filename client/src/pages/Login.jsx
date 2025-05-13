import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast';
import { useAuth } from '../context/auth';
import { Input } from "../components";
import { BASE_URL } from '../utils/fetchData';
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login attempt with:", { email });

    try {
      console.log("Making API call to:", `${BASE_URL}/api/auth/login`);
      const res = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      console.log("Login response:", res.data);

      if (res.data) {
        const { user, token } = res.data;
        console.log("Setting auth state with:", { user, token });
        
        setAuth({
          user,
          token
        });
        
        const authData = { user, token };
        console.log("Saving to localStorage:", authData);
        localStorage.setItem("auth", JSON.stringify(authData));
        
        toast.success("Login successful!");
        console.log("Navigating to:", location.state || "/");
        navigate(location.state || "/");
      }
    } catch (err) {
      console.error("Login error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className='bg-gray-900'>
      <div className='container mx-auto px-6'>
        <form 
          className='flex w-full h-screen justify-center items-center flex-col gap-5' 
          onSubmit={onSubmit}
          data-aos="fade-up"
        >
          <h2 className='text-center text-4xl text-white font-bold'>Login</h2>

          <Input 
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$" 
            data-aos="zoom-in"
            disabled={loading}
            required
          />

          <Input 
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" 
            data-aos="zoom-in"
            disabled={loading}
            required
          />

          <Link 
            to="/forgot-password" 
            className='text-white opacity-85 font-medium'
            data-aos="fade-in"
          >
            forgot password? <span className='underline text-blue-600 font-semibold'>Reset Password</span>
          </Link>

          <button 
            type='submit' 
            className='btn px-5 py-2 font-normal outline-none border border-white rounded-sm text-xl text-white hover:text-black hover:bg-white transition-all ease-in w-full max-w-[750px]'
            data-aos="slide-up"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
