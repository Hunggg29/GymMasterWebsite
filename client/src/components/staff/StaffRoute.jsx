import React, {useState, useEffect} from 'react';
import { useAuth } from '../../context/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Spinner} from "../"
import { BASE_URL } from '../../utils/fetchData';

const StaffRoute = () => {
    const [ok, setOk] = useState(false);
    const {auth} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                if (!auth?.token) {
                    setOk(false);
                    return;
                }

                const res = await axios.get(`${BASE_URL}/api/auth/admin-auth`);
                setOk(true);
            } catch (err) {
                console.error("Auth check error:", err);
                setOk(false);
            }
        };

        authCheck();
    }, [auth?.token]);

    if (!auth?.token) {
        return <Spinner path='login'/>;
    }

    return ok ? <Outlet/> : <Spinner path='login'/>;
}

export default StaffRoute;