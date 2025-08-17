import React, { useEffect, useState} from 'react';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useParams } from 'react-router';
import Loading from '../Utils/Loading';

const BlogDetails = () => {
    const axiosPublic = useAxiosPublic()
    const params = useParams()
    const [blog, setBlog] = useState(null)
    

    useEffect(()=>{
        axiosPublic(`/blog/${params.id}`)
            .then(res =>{
                setBlog(res.data)
            })
            .catch(error => console.log(error))
    }, [])

    if(blog === null) return <Loading></Loading>

    function stripHtml(html) {
        return html.replace(/<[^>]+>/g, '');
    }

    
    return (
        <div className='mb-10 w-11/12 mx-auto max-w-screen-xl'>
            <div className='pt-10'>
                <img className='h-60 w-60 border-gray-200 border object-cover rounded-xl mx-auto' src={blog.image} alt="" />
                <div className='max-w-xl mx-auto'>
                    <h2 className='text-2xl font-bold my-5'>Title: {blog.title}</h2>
                    <content>{stripHtml(blog.content)}</content>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;