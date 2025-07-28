import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <p className='text-8xl font-bold'>404</p>
            <Link to='/'>
                <button className='btn bg-black text-white mt-5'>Go Back Home</button>
            </Link>
        </div>
    );
};

export default ErrorPage;