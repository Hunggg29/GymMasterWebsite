import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Heading, ContactComponent, Loader } from '../../components';
import {userImg} from "../../images";
import {toast} from "react-hot-toast";
import {BASE_URL} from "../../utils/fetchData";
const ContactUs = () => {
  const [contact, setContact] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllContact= async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/api/contact`);
      setContact(Array.isArray(res.data) ? res.data : []);
      setLoading(false);
    }
    catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting all contact");
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllContact();
  }, []);

  if(loading){
    return <Loader/>
  }
  
  return (
    <section className='pt-10 bg-gray-900'>
    <Heading name="Query List" />
    <div className="container mx-auto px-6 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {contact.map((u, i) => (
        <ContactComponent userImg={userImg} name={u.name} email={u.email} city={u.city} phone={u.phone} message={u.message} i={u.id} key={i} />
        ))}
      </div>
    </div>
  </section>
  )
}

export default ContactUs;