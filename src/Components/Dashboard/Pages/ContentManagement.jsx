import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useRole from '../../Hooks/useRole';
import toast from 'react-hot-toast';

const ContentManagement = () => {
    const {role} = useRole()
    const [allBlog, setAllBlog] = useState(null);
    const [blogData, setBlogData] = useState(null)
    const axiosSecure = useAxiosSecure();

    const reFetch=()=>{
    axiosSecure('/get-blog')
        .then((res)=> {
            console.log(res.data)
            setBlogData(res.data);
            setAllBlog(res.data)
        })
        .catch((error)=> console.log(error))
    }

    useEffect(()=>{
        reFetch()
    }, [])

    const handleStatusChange=(status, id)=>{
        const obj = {status: status}

        axiosSecure.patch(`/update-status/${id}`, obj)
        .then(()=> {
            toast.success(`${status} Successfully!`)
            reFetch()
        })
        .catch((error)=> 
            toast.error(error.code)
         )

    }
    const handleDelete=(id)=>{
        axiosSecure.delete(`/delete-blog/${id}`)
        .then(()=> {
            toast.error('Blog Deleted Successfully')
            reFetch()
        })
        .catch((error)=> 
            toast.error(error.code)
        )
    }

    const handleFilter=(keyword)=>{
        if(keyword === 'all'){
            setBlogData(allBlog)
            return;
        }
        const filtered = allBlog.filter((blog) => blog.status === keyword);
            setBlogData(filtered);
    }
    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <h1 className='text-4xl font-bold'>Content Management</h1>
            <div className='flex justify-end'>
                <Link to='/dashboard/content-management/add-blog'>
                <button className='block btn bg-black text-white mt-5'>Add Blog</button></Link> 
            </div>
            <div className={`overflow-x-auto mt-5 rounded-box border border-base-content/5 bg-base-100 ${
                allBlog?.length === 0 ? 'hidden' : ''}`}>
                <div className='flex justify-between p-5'>
                    <h2 className='font-bold text-lg'>All Blogs</h2>
                    <div>
                        Filter:
                        <select name="filter" defaultValue='All' onChange={(e)=>handleFilter(e.target.value)}>
                            <option value="all">All</option>
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>
                </div>
                <table className='table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th className={`text-center ${role === 'volunteer' ? 'hidden' : ''}`}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    blogData?.map(blog => (
                        <tr key={blog._id}>
                        <td>{blog.title}</td>
                        <td>
                            {blog.status}
                        </td>
                        <td className={`text-center ${role === 'volunteer' ? 'hidden' : ''}`}>
                           {
                            blog.status === 'draft'?
                            <button onClick={()=> handleStatusChange('published', blog._id)} className='btn btn-success'>Publish</button>:
                            <button onClick={()=> handleStatusChange('draft', blog._id)} className='btn'>Unpublish</button>
                           }
                           <button onClick={()=>handleDelete(blog._id)} className='btn btn-error ml-2'>Delete</button>
                        </td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContentManagement;