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
  const [processedFeedbacks, setProcessedFeedbacks] = useState(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentFeedbackId, setCurrentFeedbackId] = useState(null);

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
      if (response) {
        toast.success('Feedback deleted successfully');
        // Remove from processed set if it was processed
        setProcessedFeedbacks(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
        getAllFeedbacks(); // Refresh the list
      } else {
        toast.error('Failed to delete feedback');
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      toast.error(error.response?.data?.message || 'Error deleting feedback');
    }
  };

  const handleProcessClick = (id) => {
    setCurrentFeedbackId(id);
    setShowConfirmModal(true);
  };

  const handleProcess = () => {
    if (!currentFeedbackId) return;

    setProcessedFeedbacks(prev => {
      const newSet = new Set(prev);
      newSet.add(currentFeedbackId);
      return newSet;
    });

    setShowConfirmModal(false);
    setCurrentFeedbackId(null);
    toast.success('Feedback marked as processed');
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  if(loading){
    return <Loader/>
  }

  return (
    <section className='pt-10 bg-gray-900 min-h-screen'>
      <Heading name="Feedback List" />
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {feedbacks.map((f, i) => (
            <FeedbackComponent 
              userImg={userImg} 
              rating={f.rating} 
              comment={f.message} 
              name={f.userName} 
              date={f.createdAt} 
              i={i} 
              key={i} 
              feedbackId={f.id} 
              handleDelete={() => handleDelete(f.id)}
              handleProcess={() => handleProcessClick(f.id)}
              isProcessed={processedFeedbacks.has(f.id)}
            />
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Process Feedback</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to mark this feedback as processed? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                onClick={() => {
                  setShowConfirmModal(false);
                  setCurrentFeedbackId(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                onClick={handleProcess}
              >
                Confirm Process
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeedbackList;