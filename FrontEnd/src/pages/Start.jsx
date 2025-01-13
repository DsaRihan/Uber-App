import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] 
                    bg-cover h-screen pt-8 w-full flex justify-between flex-col bg-red-400'>
        <img className='w-16 ml-4 -mt-4' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <div className='bg-white px-4 py-4 pb-7'>
            <h2 className='text-3xl font-bold text-center'>Get Started with Uber</h2>
            <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'>Continue</Link>
        </div>
    </div>
  )
}

export default Start
