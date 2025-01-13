import React, { createContext, useState } from 'react'

export const UserdataContext = createContext();

const Usercontext = ({children}) => {
    const[user, setuser] = useState({
        email:'',
        fullname:{
            firstname:'',
            lastname:'',
        },
    });
  return (
    <div>
        <UserdataContext.Provider value={{user,setuser}}>
            {children}
        </UserdataContext.Provider>
    </div>
  )
}

export default Usercontext
