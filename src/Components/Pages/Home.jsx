import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='w-full min-h-screen'>
            {/* banner */}
           <div className='bg-linear-to-r from-red-900 to-red-950 text-white h-170 flex flex-col text-center justify-center items-center'>
                <div className='w-11/12'>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Donate Blood, Save Lives</h1>
                    <p className="text-md md:text-lg mb-8">Your donation can make a difference in someone's life. Join our community of blood donors and help save
                    lives in your area.
                    </p>
                </div>
                <div className='flex space-x-5'>
                    <Link to='/register'><button className='btn btn-outline'>Join As Donor</button></Link> 
                   <Link to='/search'><button className='btn'>Search Donors</button></Link> 
                </div>
           </div>
        </div>
    );
};

export default Home;