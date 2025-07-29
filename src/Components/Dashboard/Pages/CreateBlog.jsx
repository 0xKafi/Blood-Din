import React, {useRef, useState} from 'react';
import JoditEditor from 'jodit-react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const axiosPublic = useAxiosPublic()

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const image = e.target.url.value

        const dataObj = {
            title,
            image
        }
        dataObj.content = content;
        dataObj.status = 'draft'

        axiosPublic.post('/add-blog', dataObj)
        .then(()=>{
            toast.success('Blog Added Successfully!')
        })
        .catch((error)=>
            toast.error(error.code)
        )

        e.target.reset()
    }
    return (
        <div className='min-h-screen bg-[#f0f1f7] px-6 pt-6'>
            <div className='flex flex-col justify-center items-center overflow-x-auto p-4 shadow bg-white'>
                <form onSubmit={handleSubmit} className="fieldset bg-white rounded-box overflow-x-auto">
                
                    <label className="label">Title</label>
                    <input type="text" className="input" name='title' required placeholder="Title of the Blog"/>  

                    <label className="label">Thumbnail</label>
                    <input type="text" className="input" required name='url' placeholder="Photo Url"/>

                    <label className="label">Content</label>
                    <div className="border rounded-box p-2 bg-base-100">
                        <JoditEditor
                        ref={editor}
                        value={content}
                        onChange={newContent => setContent(newContent)}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-full mt-4">
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;