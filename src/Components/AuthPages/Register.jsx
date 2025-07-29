import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import district from '../../assets/district.json'
import upazila from '../../assets/upazila.json'
import axios from 'axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [showPass, setShowPass] = useState(false) 
    const {createUser, updateUserProfile} = useContext(AuthContext)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const handleSingUp = (e) =>{
        e.preventDefault()
        const name = e.target.userName.value;
        const image = e.target.url.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPass = e.target.confirmPass.value;
        const blood_type = e.target.bloodType.value;
        const district = e.target.district.value;
        const upazila = e.target.upazila.value;

        const userObj = {
            name,
            image,
            email,
            blood_type,
            district,
            upazila,
        }
        userObj.role = 'donor'
        userObj.status = 'active'
        
        console.log(userObj)
        
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const isLongEnough = password.length >= 6;

        setMessage(null)

        if(!hasUppercase){
            setMessage("add minimum one upppercase letter");
            return;
        }
        else if(!hasLowercase){
            setMessage("add minimum one lowercase letter");
            return;
        }
        else if(!isLongEnough){
            setMessage("password length must be 6 or above")
            return;
        }
        else if(password != confirmPass){
            setMessage("password doesn't match")
            return;
        }
       const profile = {
            displayName : name,
            photoURL: image
        }


        createUser(email, password)
        .then(()=>{
            updateUserProfile(profile)
            .then(()=>{
                axios.post('http://localhost:3000/users', userObj)
                .then(() => {
                    toast.success('Account Created!')
                    navigate('/');
                })
            })
        })
        .catch((error)=>{
            toast.error(error.code)
        })
        
    }

    return (
        <div className='max-w-screen-xl mx-auto min-h-screen'>
            <div className='mx-auto w-full flex justify-center items-center mt-20'>
                <div className='flex flex-col justify-center items-center py-4 w-sm shadow'>
                    <form onSubmit={handleSingUp} className="fieldset bg-white rounded-box w-xs">
                        <label className="label">Email</label>
                        <input type="email" className="input" name='email' required placeholder="Email" />

                        <label className="label">Name</label>
                        <input type="text" className="input" required name='userName' placeholder="Name" />

                        <label className="label">Photo Url</label>
                        <input type="text" className="input" required name='url' placeholder="Photo Url" />

                        <label className="label">Select Blood Type</label>
                        <select name="bloodType" defaultValue="" className="select" required>
                        <option value="" disabled>Select Blood Type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        </select>

                        <label className="label">Select District</label>
                        <select name="district" defaultValue="" className="select" required>
                        <option value="" disabled>Select District</option>
                        {
                            district.map(data => <option>{data.name}</option>)
                        }
                        </select>

                        <label className="label">Select Upazila</label>
                        <select name="upazila" defaultValue="" className="select" required>
                        <option value="" disabled>Select Upazila</option>
                        {
                            upazila.map(data => <option>{data.name}</option>)
                        }
                        </select>

                        <label className="label">Password</label>
                        <div className='relative'>
                        <input type={showPass? "text": "password" } className="input" name='password' required placeholder="Password" />
                        <button type='button' onClick={()=> setShowPass(!showPass)} className='absolute top-3 right-3'>
                            {
                                showPass?  <EyeOff size={15} /> : <Eye size={15}/>
                            }
                        </button>
                        </div>

                        <label className="label">Confirm Password</label>
                        <div className='relative'>
                        <input type={showPass? "text": "password" } className="input" name='confirmPass' required placeholder="Password" />
                        <button type='button' onClick={()=> setShowPass(!showPass)} className='absolute top-3 right-3'>
                            {
                                showPass?  <EyeOff size={15} /> : <Eye size={15}/>
                            }
                        </button>
                        </div>
                        {
                            message ? <p className='text-xs text-red-700'>{message}</p> : ""
                        }
                        <button className="btn bg-gray-900 text-white mt-4">Sign Up</button>
                    </form>
                    <p className='font-normal text-xs mt-2'>Already have account? <Link to='/login' className='link'>login here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;