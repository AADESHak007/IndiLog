
// import NavBar from './NavBar'
// import { BlogsResponse } from '../hooks'
// import DOMPurify from 'dompurify'
// import axios from 'axios'
// import { BACKEND_URL } from '../config'
// import { useNavigate } from 'react-router-dom'
// import { Avataar } from './Avataar'
// // import { useRecoilValue } from 'recoil'
// // import { userDetail } from '../store/atoms'

// const DetailedBlog = ({ blog }: { blog: BlogsResponse }) => {
//     const sanitizedContent = DOMPurify.sanitize(blog.content)
//     console.log(sanitizedContent);
//     const navigate = useNavigate();
//     const blogid = blog.id;
//     // const userInfo = useRecoilValue(userDetail) ;

//     const handleDelete = async () => {

//         try {
//             const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/deleteBlog`
//                 , {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("token")}`,
//                         blogId: blogid
//                     }
//                 })
//             navigate("/blogs");
//             console.log("Blog deleted successfully.", response);
//         } catch (error) {
//             console.log("An error occurred while trying to delete the blog.")
//         }
//     }

//     const handleUpdate = async () => {
//         navigate(`/updateblog/${blogid}`);

//     }


//     return (
//         <div>
//             <NavBar />
//             <div className='flex justify-center'>
//                 <div className='grid grid-cols-12  px-10 w-full pt-2 max-w-screen-xl'>
//                     <div className='p-3 col-span-8'>
//                         <section className=''>
//                             <div className='text-3xl font-extrabold mb-2 w-[85%]'>
//                                 {blog.title}
//                             </div>
//                             <h1 className='date font-medium text-sm text-zinc-400 mb-2'>Published On : {blog.createdAt.split("T")[0]}</h1>
//                             <p className='w-[87%] font-semibold text-zinc-800' dangerouslySetInnerHTML={{ __html: sanitizedContent }}>
//                             </p>
//                         </section>

//                     </div>
//                     <div className='p-3 col-span-4'>
//                         <h2 className='text-md font-semibold text-slate-400'>Author</h2>
//                         <div className='flex gap-5 items-center'>
//                             <div className='left '>
//                                 <Avataar name={blog.author.name} size={28}/>
//                             </div>
//                             <div className='right'>
//                                 <h1 className='font-bold mb-2'>
//                                     {blog.author.name}
//                                 </h1>
//                                 <p className='text-sm font-semibold text-gray-500'>
//                                     this is the blog of the author signed up to IndiLog. If you wish publish your thoughts just sign up to IndiLog today .
//                                 </p>
//                                 {(localStorage.getItem("email") === blog.author.email) ? <button onClick={handleDelete} className='px-3 py-1 mt-3 rounded-md bg-red-600 text-white text-md font-semibold mr-3'>DELETE</button> : <></>}
//                                 {(localStorage.getItem("email") === blog.author.email) ? <button onClick={handleUpdate} className='px-3 py-1 mt-3 rounded-md bg-green-500 text-white text-md font-semibold'>UPDATE</button> : <></>}

//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DetailedBlog


import NavBar from './NavBar';
import { BlogsResponse } from '../hooks';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { Avataar } from './Avataar';

const DetailedBlog = ({ blog }: { blog: BlogsResponse }) => {
    const sanitizedContent = DOMPurify.sanitize(blog.content);
    const navigate = useNavigate();
    const blogid = blog.id;

    const handleDelete = async () => {
        try {
            const response = await axios.delete(
                `${BACKEND_URL}/api/v1/blog/deleteBlog`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        blogId: blogid,
                    },
                }
            );
            navigate('/blogs');
            console.log('Blog deleted successfully.', response);
        } catch (error) {
            console.log('An error occurred while trying to delete the blog.');
        }
    };

    const handleUpdate = async () => {
        navigate(`/updateblog/${blogid}`);
    };

    return (
        <div>
            <NavBar />
            <div className="flex justify-center mt-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-5 w-full max-w-screen-xl">
                    {/* Blog Content */}
                    <div className="md:col-span-8 bg-white shadow-md rounded-lg p-6">
                        <section>
                            <h1 className="text-3xl font-extrabold mb-4 text-gray-800">{blog.title}</h1>
                            <p className="text-sm text-zinc-400 font-medium mb-6">
                                Published On: {blog.createdAt.split('T')[0]}
                            </p>
                            <div
                                className="text-gray-700 leading-relaxed font-medium"
                                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                            />
                        </section>
                    </div>

                    {/* Author Info and Actions */}
                    <div className="md:col-span-4 bg-gray-50 shadow-md rounded-lg p-6">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Author</h2>
                        <div className="flex items-center gap-4 mb-4">
                            <Avataar name={blog.author.name} size={48} />
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">{blog.author.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    This is the blog of the author signed up to IndiLog. If you wish to publish your
                                    thoughts, just sign up to IndiLog today.
                                </p>
                            </div>
                        </div>

                        {/* Conditional Buttons */}
                        {localStorage.getItem('email') === blog.author.email && (
                            <div className="flex gap-4 mt-6">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold"
                                >
                                    DELETE
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold"
                                >
                                    UPDATE
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedBlog;
