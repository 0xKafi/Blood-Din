import React, { useContext, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useLocation, useNavigate, } from 'react-router';
import AuthContext from '../Auth/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const {loginUser} = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogin=(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
        .then(()=>{
            toast.success('Login Successful, Welcome back!')
            navigate(`${location.state ? location.state : '/'}`)
        })
        .catch((error)=>{
            toast.error(error.code)
        })
    }

    return (
        <div className='max-w-screen-xl mx-auto min-h-screen'>
            <div className='mx-auto w-full flex justify-center items-center mt-20'>
                <div className='flex flex-col justify-center items-center py-4 w-sm shadow'>
                    <form onSubmit={handleLogin} className="fieldset bg-white rounded-box w-xs">
                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' required placeholder="Email" />

                        <label className="label">Password</label>
                        <div className='relative'>
                        <input type={showPass? "text": "password" } className="input" name='password' required placeholder="Password" />
                        <button onClick={()=> setShowPass(!showPass)} type='button' className='absolute top-3 right-3'>
                            {
                                showPass?  <EyeOff size={15} /> : <Eye size={15}/>
                            }
                        </button>
                        </div>
                        <div className='link self-start'>Forget Password?</div>
                        <button className="btn bg-gray-900 text-white mt-4">Login</button>
                    </form>
                    <p className='font-normal text-xs mt-2'>Don't have account? <Link to='/register' className='link'>Create here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;