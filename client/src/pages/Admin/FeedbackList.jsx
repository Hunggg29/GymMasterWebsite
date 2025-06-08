import React, { useState, useEffect } from 'react';
import { Heading, FeedbackComponent, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/fetchData';
const FeedbackList = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllFeedbacks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/feedback`);
      setFeedbacks(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting all feedbacks");
      setLoading(false);
    }
  }


  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/feedback/${id}`);
      if (response.status === 200) {
        toast.success('Feedback deleted successfully');
        getAllFeedbacks(); // Refresh the list
      } else {
        toast.error('Failed to delete feedback');
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error(error.response?.data?.message || 'Error deleting feedback');
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);


  if(loading){
    return <Loader/>
  }


  return (
    <section className='pt-10 bg-gray-900'>
      <Heading name="Feedback List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {feedbacks.map((f, i) => (
            <FeedbackComponent userImg={userImg} rating={f.rating} comment={f.message} name={f.userName} date={f.createdAt} i={i} key={i} feedbackId={f.id} handleDelete={() => handleDelete(f.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeedbackList;