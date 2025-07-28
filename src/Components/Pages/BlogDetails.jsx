import React, { useEffect, useState} from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useParams } from 'react-router';

const BlogDetails = () => {
    const axiosPublic = useAxiosPublic()
    const params = useParams()
    const [blog, setBlog] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(()=>{
        axiosPublic(`/blog/${params.id}`)
            .then(res =>{
                console.log(res.data)
                setBlog(res.data)
                setLoading(false)
            })
            .catch(error => console.log(error))
    }, [])

    function stripHtml(html) {
        return html.replace(/<[^>]+>/g, '');
    }

    
    return (
        <div className='min-h-screen bg-[#f0f1f7]'>
            <div className='pt-10'>
                <img className='min-w-xs max-w-md mx-auto' src={blog.image} alt="" />
                <div className='max-w-screen-xl mx-auto'>
                    <h2 className='text-3xl font-bold my-5'>{blog.title}</h2>
                    <p>{stripHtml(blog.content)}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;