import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Captaindatacontext } from '../context/Captaincontext';
import axios from 'axios';

const CaptainProtectedw = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate =  useNavigate()

    const {captain, setcaptain} = useContext(Captaindatacontext);
    const [loading, setloading] = useState(false)

    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
    },[token]);

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`,{
        headers: {
            Authorization:`Bearer ${token}`
        }
    }).then((responce) => {
        if(responce.status === 200){
            setcaptain(responce.data.captain)
            setloading(false);
        }
    }).catch((err) => {
        console.log(err)
        navigate('/captain-login')
    });

    return (
        <>
            {children}
        </>
  )
}

export default CaptainProtectedw
