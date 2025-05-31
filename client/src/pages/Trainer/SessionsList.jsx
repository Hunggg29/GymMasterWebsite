import { useState, useEffect } from 'react';
import { Heading, SessionTrainer, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
import { useAuth } from '../../context/auth';
const SessionsListTrainer = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const {auth}=useAuth();
  const getAllSessions = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/Trainer/${id}/sessions`);
      
      setSessions(Array.isArray(res.data) ? res.data : []);
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


  if(loading){
    return <Loader/>
  }

  return (
    <div>
        
      <section className=' pt-10 bg-gray-900'>
         
        
         <div>
            <Heading name="Sessions List" />
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sessions.map((u, i) => {
                console.log(u);
                return( 
                <SessionTrainer u={u}/>
              )}
               
            
              )}
            </div>
          </div>
         </div>
        
        
        
      </section>
       
      
    </div>
  )
}

export default SessionsListTrainer