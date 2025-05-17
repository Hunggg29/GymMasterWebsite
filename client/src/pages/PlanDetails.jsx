import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from '../components/Loader';
import { useAuth } from '../context/auth';
import { BASE_URL } from '../utils/fetchData';
import { planImg1 } from '../images'; // Ảnh mặc định

const PlanDetails = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { planid } = useParams();
  const [planDetails, setPlanDetails] = useState({
    name: "",
    description: "",
    price: "",
    durationInDays: ""
  });

  const getPlanDetails = async () => {
    if (!planid) {
      toast.error("Plan ID is missing");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/plan/${planid}`);
      if (res.data) {
        setPlanDetails(res.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong while fetching plan details");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, [planid]);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-16 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full flex flex-col items-center relative">
        {/* Ribbon */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <span className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-lg text-lg font-semibold tracking-wide uppercase">
            Plan Detail
          </span>
        </div>
        {/* Ảnh */}
        <img
          src={planDetails.imageUrl}
          alt={planDetails.name}
          className="w-40 h-40 object-cover rounded-2xl border-4 border-blue-400 shadow-lg mt-8"
        />
        {/* Tên gói */}
        <h2 className="text-4xl font-extrabold text-blue-700 mt-6 mb-2 text-center drop-shadow">
          {planDetails.name}
        </h2>
        {/* Mô tả */}
        <p className="text-gray-600 text-lg mb-8 text-center max-w-lg">
          {planDetails.description}
        </p>
        {/* Giá & Thời gian */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center mb-8">
          <div className="flex-1 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-blue-600 font-bold text-lg mb-2">Price</span>
            <span className="text-3xl font-extrabold text-blue-800">{planDetails.price}$</span>
          </div>
          <div className="flex-1 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl p-6 flex flex-col items-center shadow">
            <span className="text-yellow-600 font-bold text-lg mb-2">Duration</span>
            <span className="text-3xl font-extrabold text-yellow-800">{planDetails.durationInDays} days</span>
          </div>
        </div>
        {/* Nút mua */}
        <Link
          to={auth.user ? `/plan-subscribe/${planid}` : "/login"}
          className="mt-2 bg-blue-600 hover:bg-blue-800 text-white font-bold text-lg rounded-full px-10 py-3 shadow-lg transition-colors duration-200"
        >
          Buy Now
        </Link>
      </div>
    </section>
  );
};

export default PlanDetails;
