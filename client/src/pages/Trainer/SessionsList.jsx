import { useState, useEffect } from 'react';
import { Heading, SessionTrainer, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
import { format, startOfWeek, addDays, isSameDay, subWeeks, addWeeks, startOfDay, getDaysInMonth, startOfMonth, endOfMonth, endOfWeek, subMonths, addMonths, isPast, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from "lucide-react";

const SessionsListTrainer = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [loading, setLoading] = useState(false);
  const {auth}=useAuth();

  const getAllSessions = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer/${id}/sessions`);
      
      setSessions(Array.isArray(res.data) ? res.data : []);
      filterSessionsByDate(Array.isArray(res.data) ? res.data : [], selectedDate);
      setLoading(false); 
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting all users || internet issue");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllSessions(auth.user.id);
  }, [auth]);

  const filterSessionsByDate = (sessionsData, date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const filtered = sessionsData.filter(session => {
      const sessionDate = session.startTime.split('T')[0];
      return sessionDate === formattedDate;
    });
    setFilteredSessions(filtered);
  };

  const getDaysInMonthView = (month) => {
    const startOfCurrentMonth = startOfMonth(month);
    const endOfCurrentMonth = endOfMonth(month);
    const startOfCalendar = startOfWeek(startOfCurrentMonth, { weekStartsOn: 1 });
    const endOfCalendar = endOfWeek(endOfCurrentMonth, { weekStartsOn: 1 });

    const days = [];
    let day = startOfCalendar;

    while (day <= endOfCalendar) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleTodayClick = () => {
    const today = startOfDay(new Date());
    setSelectedDate(today);
    setCurrentMonth(startOfMonth(today));
    filterSessionsByDate(sessions, today);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    filterSessionsByDate(sessions, date);
  };

  const hasSession = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return sessions.some(session => session.startTime.split('T')[0] === formattedDate);
  };


  if(loading){
    return <Loader/>
  }

  const daysInMonthView = getDaysInMonthView(currentMonth);

  return (
    <div>
        
      <section className=' pt-10 bg-gray-900'>
         
        
         <div>
            <Heading name="Your Sessions" />
            <p className="text-gray-400 text-lg mt-2 text-center">View and manage your scheduled sessions</p>

            {/* Calendar View Section */}
            <div className="bg-white rounded-lg shadow-xl p-6 mb-8 mt-10 max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <h2 className="text-2xl font-bold text-gray-800">{format(currentMonth, 'MMMM yyyy')}</h2>
                <button
                  onClick={handleNextMonth}
                  className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
                <div>Su</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {daysInMonthView.map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-center cursor-pointer transition-all duration-200
                      ${isSameDay(day, selectedDate) ? 'bg-blue-600 text-white' : ''}
                      ${isToday(day) && !isSameDay(day, selectedDate) ? 'border-2 border-blue-500 text-blue-500' : ''}
                      ${isPast(day) && !isToday(day) ? 'text-gray-400' : 'text-gray-800'}
                      ${!isSameDay(day, startOfMonth(currentMonth)) && !isSameDay(day, endOfMonth(currentMonth)) && (day.getMonth() !== currentMonth.getMonth()) ? 'opacity-50' : ''}
                      ${hasSession(day) && !isSameDay(day, selectedDate) ? 'bg-blue-100 font-semibold' : ''}
                      hover:bg-gray-200`}
                    onClick={() => handleDayClick(day)}
                  >
                    <span className="text-lg font-bold">{format(day, 'd')}</span>
                    {hasSession(day) && (
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={handleTodayClick}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Today
                </button>
              </div>
            </div>

            {filteredSessions.length === 0 ? (
              <div className="text-center text-white text-xl mt-8">
                No training sessions scheduled for {format(selectedDate, 'MMMM d, yyyy')}
              </div>
            ) : (
              <div className="container mx-auto px-6 py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredSessions.map((u, i) => {
                    console.log(u);
                    return(
                      <SessionTrainer u={u}/>
                    )
                  })}
                </div>
              </div>
            )}
         </div>
        
        
        
      </section>
       
      
    </div>
  )
}

export default SessionsListTrainer;