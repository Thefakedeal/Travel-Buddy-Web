import { useEffect, useState } from 'react'
import { doGet } from '../helpers/request';

export default function useAuth() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const fetchUser = async ()=>{
        setLoading(true);
        const response = await doGet({path:'user',token: token});
        if(response.ok){
            const user = await response.json();
            setUser(user);
        }else{
            setUser(null);
        }
        setLoading(false);
    }

    useEffect(()=>{
        fetchUser()
        localStorage.setItem('token', token);
    },[token]);

    return {loading, user, token, setToken};
}
