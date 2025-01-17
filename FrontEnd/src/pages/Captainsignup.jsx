import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Captaindatacontext } from '../context/Captaincontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Captainsignup = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [firstname, setfirstname] = useState('');
    const [lastname, setlastname] = useState('');

    const [vehicletype, setvehicletype] = useState('');
    const [vehiclecolor, setvehiclecolor] = useState('');
    const [vehicleplate, setvehicleplate] = useState('');
    const [vehiclecapacity, setvehiclecapacity] = useState('');

   
    const navigate = useNavigate();
    const {captain, setcaptain} = useContext(Captaindatacontext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captaindata = {
            email:email,
            password:password,
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            vehicle :{
                color:vehiclecolor,
                capacity:vehiclecapacity,
                plate:vehicleplate,
                type:vehicletype
            }
        };

        const responce = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captaindata)
        if(responce === 201){
            const data = responce.data
            setcaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-home')
        }

        setemail('');
        setpassword('');
        setfirstname('');
        setlastname('');
        setvehiclecapacity('');
        setvehiclecolor('');
        setvehicleplate('');
        setvehicletype('');
    };
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///
            8AAAAeHh7x8fHPz8/T09P09PQWFhZxcXGqqqp0dHTKysrj4+Ojo6Pp6emcnJyBgYGVlZWxsbHDw8OLi4tMTExSUlK6urrb29s0NDQmJiZEREQ7O
            zuRkZEbGxtsbGwODg5jY2NZWVk4ODh8fHwsLCxmZmaMbmxuAAAG1klEQVR4nO2d62KqOhCFpVoUFVFRa9W22Nq+/yOeYyXJEHIDYgX2+
            v6BGcmSQOYScDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADaznx1SYYO7RbJZTWnO6LlZnSnPnllGVxJrO2S33ZLvj373d7ds2t+
            iIMbqaVdmreL8+1Fvv1z7w42Ju9o8Gpp980a5tsXtj03mj2eOetoEBrbDXm7/W3HgW2v/6CXTXh2VLjg7Z5vO57Ydmy0ezxQyIDC9gKFDChs
            L1DIgML2AoUMu8JwlPycnrLs6XRezVzizbwD8XT79T5+3U6SmbkLNfGlcL0LChxjl+6+nItWu7V/kV4UhptAwdJ2IlfuVrPPw+vm1sN9f
            DmeDkfni6O6wlFJYaTq6ZWV6RvXFaxueYhgMRiuMtbs27NCEUfOJIVvn7qu/h9WL3TfF271Vt+yFcsvHN9os+lfKTSjSY48m61eiq01v
            6HbNXtvhUGk+rbUZlW8ysbqRvt2KFRJnFW00ijUXgJ/rJAZCPYuVnR4qxUenAT6VXhaxut1tDlKu6VsXFjZSq3Qlv/0rvCdzPHRK/
            1ESlSeC1aJg5VSoaNAfwqlWawwRxYS6ml1K1nhx2rtqs+bwkPpqg9P5GPqp5DdWSmbrLYqKBxXTND6UfitMiYXlqh28CqCzop4AheVwqXC5v
            4Kx2pbclmJBtzrCjK11VfZiigs3Zj/RqFm6hWVADG9zepYjW02Jnwo1DrYwrk+sl0ffNeb3eqU7+EKKw/RgR+FeitesOJ3DRerV9
            mKK1S6gBY8KDQUV194o9yXFu6MIb5LZatHKzS5h7zR5rYt7qQ/Uy1iJC9bofDdZMbv/Xk1fBlUYtcKhROTGU9vPEmK3XhqhcKNyYy7Ydltu
            +B52slaoVB717+SSl/Pa+OOhB1SOKilcNAGhcZRymfv7LZdcZRuPSgUE5R51YinO42UN7bx7EGh8AJfjO3E3C3nS+84W7AuNVIo5mTjuRhM5N
            /VacYXCYt8LIsQ9zydmJkm5fiwlkIxQxmbiR+2pNCQ2RZOdB6Ti4vCvpBO0EzhyumYiUGh4acRt052H3OxKtFMIck+6yspJGZTKNTOF2JMbtku
            4XMa78FFmikk4eVW24Zm+soK2S4ZUc1RRsAaq8FiHUmBbkOFZADqah1TokalUDOXHlQNSEZCPWZ+z/K58I0NFdIErVpiQaBS4cGSiSIjMrJY5X
            e+QkK7oUJ6EoNt+XcdSvGASqEigbKgDhqVQk5iVrIa8qzAWmVSU2Gxs/KXxIGEWqE8ZxTMCvG8Y0b4w6dCqVKSiCl8kQQlNAqp3TAqfHosHu5MP
            8tiPmrCghVdQN5YYek8ff+s4iheTZV+slZhELxOkyhKLidptzzys+LHX5MkjpKlVJmhk0lzhZXcRYNCo4Fgbrcp+oIeFEq3S68KFR79yG6lrpA2
            UDh4Mx2uiUJlyGIp48vL470o1C/+aKZQ47jMNYXrHKl25kfhYP5lOORJDKzSiqEPpcUvW33i4Gw4mByPcYVNn3woTX2cmAQFead5tD4apO8a
            M2OHUt1pLGfDuc+hc2WdCdVX4+oqikVZLFBmLvTv0qRIpdEaASrXUm0Up505CV9NBV6R19IFn+xWcTtporqep2Dy9E4qjdWzOSmSM5Ostpqzz
            ld9eSEcxZfPq3uYbafxiPyi0Sn4pucl3QXZhszm+5vdYTdNKoymfXTZXY/29POW6gPU/4813rgv6QQAAAAA+DcJ09h9uWMX+Q2rysnN/sCinLa
            /W6A+LLbJHt2ReyHSRudHd+VOkIJY2581rAkpAzZPlLQTukTkLg9BPhxaYdTXiTsNTVEbF3l1F1pkq75avhPQJwB7mvIiNT8vedn2QevEF3vzLk
            JT8E757O5BE/Ce0uttg1QMba8+6yjUe/uwN+8iL0Ri29/SVpMLkdjTiJ+slDEufu4udJ3p56M7cx/ouwKqrGPuELTSj3C4o3QzHB5WIKTrQyusRn
            8g4SSoTxfC4aFdhokO+OAVn7WSOdqP8GAansIOnETrSk8brfdPF3YNZtpfkJKXnVfE8VVGj8TppU16uuC57Ss+m1ug2bLkP2MxqsAzjfT7WVAkF2
            4HLsIa0ExG+++jNaBjtJeJYfpATz+T+yQr3M8CzQ85hb0sstHqTC9XgVH3p5fF7pBUSbuToalC77Ns9N3UXfC3K9P7bHf/KxY0UH50X+4Cfdi79Z
            mZOlB/uyNBbzX6X8EXL+n8B4Le1ieA60Drab0Meuk7HvoZ9BKFJ3vjbsIV9jLovcJWJ3ShHFqTS4/vMjn7zdTp340AAAAAAAAAAAAAAAAAAAAAA
            AAAAAAAAABA+A+Zvk+7fCNgaAAAAABJRU5ErkJggg==" alt="" />
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
                <input className='bg-[#eeeeee]  rounded px-4 py-2 w-full text-lg placeholder:text-base border'
                    required type="password" placeholder='password' 
                    value={password} onChange={(e)=>{setpassword(e.target.value)}}/>

                
                <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Vehicle Information</h3>
                <div className='flex gap-2'>
                    <select className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-sm border' 
                            required value={vehicletype} onChange={(e) => {setvehicletype(e.target.value)}}>
                            
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="bike">Bike</option>
                        </select>

                        {/* <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Vehicle Plate</h3> */}
                        <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base border' 
                            required type="text" placeholder='Vehicle Plate'
                            value={vehicleplate} onChange={(e) => {setvehicleplate(e.target.value)}} />
                </div>
                <div className='flex gap-2'>
                    {/* <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Vehicle Capacity</h3> */}
                    <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base border' 
                        required type="text" placeholder='Vehicle Capacity'
                        value={vehiclecapacity} onChange={(e) => {setvehiclecapacity(e.target.value)}} />
                    
                    {/* <h3 className='text-lg font-medium mb-2 mt-7'>Enter your Vehicle Color</h3> */}
                    <input className='bg-[#eeeeee] mb-7 rounded px-4 py-2 w-1/2 text-lg placeholder:text-base border' 
                        required type="text" placeholder='Vehicle Color'
                        value={vehiclecolor} onChange={(e) => {setvehiclecolor(e.target.value)}} />
                </div>

                <button className='bg-[#111] mb-3 text-white rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                    Create captain Account
                </button>

                {/* incase of new user */}
                <p className='text-center'>Already have a account ? <Link to='/captain-login' className='text-blue-500'
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

export default Captainsignup


