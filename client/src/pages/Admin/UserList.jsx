import { useState, useEffect } from 'react';
import { Heading, User, Loader } from '../../components';
import axios from 'axios';
import {toast} from "react-hot-toast";
import {userImg} from "../../images";
import { BASE_URL } from '../../utils/fetchData';
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(true);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/users`);
      setUsers(Array.isArray(res.data) ? res.data : []);
      setLoading(false); 
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting all users || internet issue");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);

const handleDelete= async () =>{
  const res = await axios.get(`${BASE_URL}/api/users`);
  setUsers(Array.isArray(res.data) ? res.data : []);
}
  if(loading){
    return <Loader/>
  }

  return (
    <div>
        
      <section className=' pt-10 bg-gray-900'>
         <div className="px-6">
    <div className="flex justify-end mb-4">
    </div>
  </div>
        {user &&( 
         <div>
            <Heading name="Staff List" />
          <div className="container mx-auto px-6 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {users.map((u, i) => ( u.role=== "staff" &&
                <User onDelete={handleDelete} id={u.id} fullname={u.fullName} userImg={userImg} name={u.username} email={u.email} contact={u.phone} role={u.role}  i={i} key={i}/>
              )
              )}
            </div>
          </div>
         </div>
        )
        }
      </section>
    </div>
  )
}

export default UserList;