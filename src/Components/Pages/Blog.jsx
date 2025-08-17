import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router';
import Loading from '../Utils/Loading';

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
            <div className='max-w-screen-xl w-11/12 mx-auto'>
                <h1 className='text-4xl font-bold py-5'>Blogs</h1>
                {
                    loading? <Loading></Loading>:''
                }
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {
                    blogs?.map((blog) => (
                    <div key={blog._id} className="flex lg:flex-row flex-col border-base-300 shadow p-4 rounded-2xl bg-white ">
                        <div className="shrink-0 border-gray-100 border overflow-hidden w-48 h-48 rounded-xl mb-4 lg:mb-0">
                            <img className='w-full h-full object-cover' src={blog.image} alt="BlogImage" />
                        </div>
                        <div className='ml-0 lg:ml-4'>
                            <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                            <p className="text-gray-700 text-sm">
                            {stripHtml(blog.content).slice(0, 100) + '...'}
                            </p>
                            <button onClick={()=>handleBlogOpen(blog._id)} className='mt-2 link text-blue-600'>Read more</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;