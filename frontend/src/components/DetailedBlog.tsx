
import NavBar from './NavBar'
import { BlogsResponse } from '../hooks'
import DOMPurify from 'dompurify'
import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useNavigate } from 'react-router-dom'
import { Avataar } from './Avataar'
// import { useRecoilValue } from 'recoil'
// import { userDetail } from '../store/atoms'

const DetailedBlog = ({ blog }: { blog: BlogsResponse }) => {
    const sanitizedContent = DOMPurify.sanitize(blog.content)
    console.log(sanitizedContent);
    const navigate = useNavigate();
    const blogid = blog.id;
    // const userInfo = useRecoilValue(userDetail) ;

    const handleDelete = async () => {

        try {
            const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteBlog`
                , {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        blogId: blogid
                    }
                })
            navigate("/blogs");
            console.log("Blog deleted successfully.", response);
        } catch (error) {
            console.log("An error occurred while trying to delete the blog.")
        }
    }

    const handleUpdate = async () => {
        navigate(`/updateblog/${blogid}`);

    }


    return (
        <div>
            <NavBar />
            <div className='flex justify-center'>
                <div className='grid grid-cols-12  px-10 w-full pt-2 max-w-screen-xl'>
                    <div className='p-3 col-span-8'>
                        <section className=''>
                            <div className='text-3xl font-extrabold mb-2 w-[85%]'>
                                {blog.title}
                            </div>
                            <h1 className='date font-medium text-sm text-zinc-400 mb-2'>Published On : {blog.createdAt.split("T")[0]}</h1>
                            <p className='w-[87%] font-semibold text-zinc-800' dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
                            </p>
                        </section>

                    </div>
                    <div className='p-3 col-span-4'>
                        <h2 className='text-md font-semibold text-slate-400'>Author</h2>
                        <div className='flex gap-5 items-center'>
                            <div className='left '>
                                <Avataar name={blog.author.name} size={28}/>
                            </div>
                            <div className='right'>
                                <h1 className='font-bold mb-2'>
                                    {blog.author.name}
                                </h1>
                                <p className='text-sm font-semibold text-gray-500'>
                                    this is the blog of the author signed up to IndiLog. If you wish publish your thoughts just sign up to IndiLog today .
                                </p>
                                {(localStorage.getItem("email") === blog.author.email) ? <button onClick={handleDelete} className='px-3 py-1 mt-3 rounded-md bg-red-600 text-white text-md font-semibold mr-3'>DELETE</button> : <></>}
                                {(localStorage.getItem("email") === blog.author.email) ? <button onClick={handleUpdate} className='px-3 py-1 mt-3 rounded-md bg-green-500 text-white text-md font-semibold'>UPDATE</button> : <></>}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DetailedBlog