import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Userlogin = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    // to store the data
    const [userdata, setuserdata] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        setuserdata({
            email:email,
            password:password
        });
        setemail('');
        setpassword('');
    };
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Email</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base border' 
                    required type="email" placeholder='email@example.com'
                    value={email} onChange={(e)=>{setemail(e.target.value)}} />
                <h3 className='text-lg font-medium mb-2 '>Enter your Password</h3>
                <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base border'
                    required type="password" placeholder='password' 
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <button className='bg-[#111] mb-3 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Login
                </button>

                {/* incase of new user */}
                <p className='text-center'>New Here ? <Link to='/signup' className='text-blue-500'
                    >Create New Account</Link>
                </p>
            </form>
        </div>

        <div>
            <Link to='/captain-login' className='flex items-center justify-center bg-[#10b461] mb-7 text-white rounded 
                px-4 py-2 w-full text-lg placeholder:text-base'>
                Sign-In as Captain
            </Link>
        </div>
    </div>
  )
}

export default Userlogin


