import { useEffect, useState } from 'react'
import { doPost } from '../helpers/request';

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchUser = async ()=>{
        setLoading(true);
        const user = await doPost({path:'user'});
        setUser(user);
        setLoading(false);
    }

    useEffect(()=>{
        fetchUser()
        localStorage.setItem('token', token);
    },[token]);

    return {loading, user, token, setToken};
}
