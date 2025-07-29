import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router';

const Blog = () => {
    const axiosPublic = useAxiosPublic()
    const [blogs, setBlogs] =useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        axiosPublic('/get-blogs')
            .then(res =>{
                setBlogs(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    function stripHtml(html) {
    return html.replace(/<[^>]+>/g, '');
    }

    const handleBlogOpen=(id)=>{
            navigate(`/blog/${id}`)
    }

    return (
        <div className='min-h-screen bg-[#f0f1f7]'>
            <div className='max-w-screen-xl mx-auto'>
                <h1 className='text-4xl font-bold py-5'>Blogs</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {
                loading? <p>loading</p>:
                    blogs?.map((blog) => (
                    <div key={blog._id} className="flex border-base-100 shadow p-4 rounded mb-4 bg-white">
                        <img src={blog.image} alt="" className="rounded w-48 h-48 object-cover mb-2" />
                        <div className='ml-4'>
                            <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                            <p className="text-gray-700 text-sm">
                            {stripHtml(blog.content).slice(0, 100) + '...'}
                            </p>
                            <button onClick={()=>handleBlogOpen(blog._id)} className='mt-2 link text-blue-600'>read more</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;