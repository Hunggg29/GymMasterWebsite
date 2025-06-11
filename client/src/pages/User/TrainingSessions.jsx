import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { BASE_URL } from '../../utils/fetchData';
import { Heading, Loader } from '../../components';
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks, startOfDay } from 'date-fns';
import { CalendarDays, Clock, UserIcon, Users, Home, ClipboardList, Dumbbell, ChevronLeft, ChevronRight } from "lucide-react";

const TrainingSession = () => {
  const { auth } = useAuth();
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${BASE_URL}/api/Users/${auth.user.id}/trainingSessions`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          }
        );

        setTrainingSessions(res.data);
        filterSessionsByDate(res.data, selectedDate);
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    };

    if (auth) {
      fetchSubscriptions();
    }
  }, [auth]);

  const filterSessionsByDate = (sessions, date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const filtered = sessions.filter(session => {
      const sessionDate = session.startTime.split('T')[0];
      return sessionDate === formattedDate;
    });
    setFilteredSessions(filtered);
  };

  const getDaysInWeek = (start) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(start, i));
    }
    return days;
  };

  const handlePreviousWeek = () => {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  };

  const handleNextWeek = () => {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  };

  const handleTodayClick = () => {
    const today = startOfDay(new Date());
    setSelectedDate(today);
    setCurrentWeekStart(startOfWeek(today, { weekStartsOn: 1 }));
    filterSessionsByDate(trainingSessions, today);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    filterSessionsByDate(trainingSessions, date);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  const daysInCurrentWeek = getDaysInWeek(currentWeekStart);

  return (
    <section className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Heading name="Your Training Sessions" />
          <p className="text-gray-400 text-lg mt-2">View Your Sessions Details</p>
        </div>

        {/* Week View Date Picker Section */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <button
            onClick={handlePreviousWeek}
            className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar">
            {daysInCurrentWeek.map((day, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-200'}
                  ${isSameDay(day, new Date()) ? 'border-2 border-blue-500' : ''}`}
                onClick={() => handleDayClick(day)}
              >
                <span className="text-sm font-medium">{format(day, 'EEEEEE')}</span>
                <span className="text-lg font-bold">{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          <button
            onClick={handleTodayClick}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Today
          </button>
        </div>

        {filteredSessions.length === 0 ? (
          <div className="text-center text-white text-xl">
            No training sessions scheduled for {format(selectedDate, 'MMMM d, yyyy')}
          </div>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSessions.map((session, index) => {
                const dateOnly = session.startTime.split("T")[0];
                const timeOnly = session.startTime.split("T")[1].slice(0, 5);
                return (
                  <div key={index} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow">
                    {/* Header Section */}
                    <div className="space-y-2 mb-4 border-b pb-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="text-blue-600" size={24} />
                        <h3 className="text-xl font-semibold text-blue-600">
                          Trainer: {session.trainerName}
                        </h3>
                      </div>
                    </div>

                    {/* Time Information Section */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-gray-700">
                        <CalendarDays className="text-blue-500" size={20} />
                        <span>Date: {dateOnly}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock className="text-blue-500" size={20} />
                        <span>Start Time: {timeOnly}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Home className="text-blue-500" size={20} />
                        <span>Room: {session.roomName}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <Dumbbell className="text-blue-500" size={20} />
                        <span>Session Type: {session.sessionType}</span>
                        
                      </div>
                      
                      <div className="flex items-center gap-3 text-gray-700">
                        <ClipboardList className="text-blue-500 mt-1" size={20} />
                        <span>Notes: {session.notes}</span>
                      </div>
                       <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={session.attendanceStatus}
              
              />
              <div className="w-5 h-5 border-2 border-gray-300 rounded transition-colors peer-checked:border-green-500 peer-checked:bg-green-500 peer-hover:border-green-400"></div>
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700 group-hover:text-gray-900">Attendance Status</span>
          </label>
                    </div>
                    
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingSession;


