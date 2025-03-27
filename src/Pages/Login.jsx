import React, { use } from 'react';
import { useState } from 'react';
import { Mail,Lock,EyeOff,Eye} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const onSubmit = (e) => {
        e.preventDefault();
        
        try {
            if (user.email === '' || user.password === '') {
                setError('Please fill all the fields');
                return;
            }
            if (!emailRegex.test(user.email)) {
                setError('Invalid Email');
                return;
            }
            if (!passwordRegex.test(user.password)) {
                setError('Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character');
                return;
            }
            login(user);
            navigate('/');
        } catch (error) {
            console.error("Login Error:", error);
            setError("Something went wrong. Please try again.");
        }
    };
    
    const handleChange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value});
        setError('');
        console.log(user);
    }
  return (
    <div
      className="h-screen w-screen flex justify-center items-center bg-gray-800 text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1509101758186-479a713d3687?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFic3RyYWN0JTIwZm9yZXN0fGVufDB8fDB8fHww')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
    <div className="h-[60%] w-[40%] bg-gray-950 bg-opacity-30 rounded-xl p-8  flex flex-col gap-8  ">
       <div className="text-center ">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white text-opacity-80">Sign in to continue</p>
        </div>
        <form onSubmit={onSubmit} className='flex flex-col gap-4'>
            <div>

                <label htmlFor="email">Email</label>
                <div className='relative'>
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
                <input placeholder='Enter Email' type="email" onChange={handleChange} id="email" className="w-full h-[3rem] pl-10 border border-white bg-white bg-opacity-40 rounded-lg mb-2 placeholder-white" />
                </div>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <div className='relative'>
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white opacity-70" size={20} />
                <input onChange={handleChange} placeholder='Enter Password' type={!showPassword?"password":"text"} id="password" className="w-full h-[3rem] pl-10 border border-white bg-white bg-opacity-40 rounded-lg mb-2 placeholder-white" />
                 <button type="button" onClick={()=>setShowPassword(!showPassword)} className='absolute right-3 top-3'>
                 {showPassword?<Eye size={20}/>:<EyeOff size={20}/>}
                 </button>
                </div>
            </div>
            <button type="submit" className='bg-green-500 text-white h-[3rem] rounded-lg hover:bg-green-600'>
                Login
            </button>
            <div className='text-red-500 text-center'>
                {error}
            </div>
        </form>
        
    </div>
    </div>
  );
}

export default Login;
