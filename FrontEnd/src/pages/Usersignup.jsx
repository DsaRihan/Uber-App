import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserdataContext } from '../context/Usercontext';

const Usersignup = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');


    const navigate = useNavigate();
    const { user,setuser } = useContext(UserdataContext);

    // to store the data
    // const [userdata, setuserdata] = useState({});

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser ={
            email:email,
            password:password,
            fullname:{
                firstname:firstname,
                lastname:lastname
            }
        };

        const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
        if (responce.status === 201) {
            const data = responce.data;
            setuser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home'); 
        }

        setemail('');
        setpassword('');
        setfirstname('');
        setlastname('');
    };
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Name</h3>
                <div className='flex gap-2 mb-7'>
                    <input className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base border' 
                        required type="text" placeholder='FirstName'
                        value={firstname} onChange={(e)=>{setfirstname(e.target.value)}}/>
                    <input className='bg-[#eeeeee] rounded px-4 py-2 w-1/2 text-lg placeholder:text-base border' 
                        required type="text" placeholder='LastName'
                        value={lastname} onChange={(e)=>{setlastname(e.target.value)}}/>
                </div>

                <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Email</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base border' 
                    required type="email" placeholder='email@example.com'
                    value={email} onChange={(e)=>{setemail(e.target.value)}} />
                <h3 className='text-lg font-medium mb-2 '>Enter your Password</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base border'
                    required type="password" placeholder='password' 
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <button className='bg-[#111] mb-3 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Create Account
                </button>

                {/* incase of new user */}
                <p className='text-center'>Already have a account ? <Link to='/login' className='text-blue-500'
                    >Log-In Here</Link>
                </p>
            </form>
        </div>

        <div>
            <p className='text-[10px]'>By proceeding, you consent to get Whatsapp messages,
                including by automated means, from uber and its afiliates to the email provided
            </p>
        </div>
    </div>
  )
}

export default Usersignup


