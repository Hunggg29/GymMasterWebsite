import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth'; 
import { Heading, Loader } from '../../components';
import { BASE_URL } from '../../utils/fetchData';
import { toast } from 'react-hot-toast';

const Feedbacks = () => {
  const { auth } = useAuth();
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllUserFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/feedback/my-feedbacks`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );

        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        setError("Failed to fetch feedbacks");
        toast.error("Failed to fetch feedbacks");
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      getAllUserFeedbacks();
    }
  }, [auth.token]);

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/feedback/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }
      );
      
      setFeedbacks(prevFeedbacks => prevFeedbacks.filter(f => f.id !== feedbackId));
      toast.success('Feedback deleted successfully');
    } catch (err) {
      console.error('Error deleting feedback:', err);
      toast.error('Failed to delete feedback');
    }
  };

  if (!auth.user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Please log in to view your feedback.
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <section className='bg-gray-900'>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Heading name="Your Feedback" />
        {error && <div className="mb-4 text-red-500">{error}</div>}
        {feedbacks.length === 0 ? (
          <div className='flex justify-center items-center h-screen'>
            <p className="text-white text-center text-4xl">No feedback submitted yet.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-700 border-2 px-6 my-20">
            {feedbacks.map(feedback => (
              <li key={feedback.id} className="py-4">
                <div className="space-y-4">
                  <p className="text-white text-xl md:text-2xl">
                    Message: {feedback.message}
                  </p>
                  <p className="text-white text-xl md:text-2xl">
                    Rating: <b>{feedback.rating}</b>
                  </p>
                  <div className="flex justify-end space-x-4">
                    <button
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Feedbacks;





