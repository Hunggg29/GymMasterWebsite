import React, { useState, useEffect } from 'react';
import { Heading, Input, TextArea } from '../components';
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from '../utils/fetchData';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS library
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      easing: 'ease-in-out', // Animation easing
      offset: 200, // Trigger animation 120px before the element comes into view
      once: true   // Whether animation should happen only once while scrolling down
    });
  }, []);

  const createQuery = async (e) => {
    e.preventDefault();

    if (!/^[A-Za-z ]+$/.test(name)) {
      toast.error("Name must contain only alphabets");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(city)) {
      toast.error("City must contain only alphabets and spaces");
      return;
    }

    const phoneNumberPattern = /^(9|8|7|6)\d{9}$/;
    if (!phoneNumberPattern.test(phone)) {
      toast.error("Phone number must start with 9, 8, 7, or 6 and contain exactly 10 digits");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(message)) {
      toast.error("Message must contain only alphabets and spaces");
      return;
    }

    console.log(name, email, city, phone, message);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/contact`, {
        name,
        email,
        message
      });
      if (data) {
        toast.success("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <section className='pt-10 contact bg-gray-900'>
      <Heading name="Contact Us" />

      <div className="container py-10 px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <form className='flex flex-col gap-6 bg-gray-800 p-8 rounded-xl' onSubmit={createQuery}>
              <div className='w-full'>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className='w-full'>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className='w-full'>
                <Input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className='w-full'>
                <Input
                  type="text"
                  placeholder="Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className='w-full'>
                <TextArea
                  value={message}
                  name="message"
                  placeholder="Write Your Message"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className='w-full'>
                <button
                  className='w-full bg-indigo-600 px-4 py-3 text-white text-center text-xl font-medium hover:bg-indigo-700 transition-all ease-in rounded-lg'
                  type='submit'>
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div data-aos="fade-left" className="space-y-6">
            {/* Email */}
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Email</h3>
                  <p className="text-gray-300">GymMaster@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Hotline</h3>
                  <p className="text-gray-300">0828458793</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Address</h3>
                  <p className="text-gray-300">
                    Wrottesley Road Tettenhall<br/>
                    Wolverhampton WV6 8SE<br/>
                    UNITED KINGDOM
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-colors duration-300">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                  <i className="fas fa-clock text-xl text-white"></i>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Opening Hours</h3>
                  <div className="text-gray-300">
                    <p className="flex justify-between">
                      <span>Monday - Friday: </span>
                      <span className="ml-3"> 6:00 AM - 10:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Saturday:</span>
                      <span>7:00 AM - 8:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span >Sunday:</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
