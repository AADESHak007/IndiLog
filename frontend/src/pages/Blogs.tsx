import { BlogCard } from '../components/BlogCard'
import Loader from '../components/Loader'
import NavBar from '../components/NavBar'
import { useBlogs } from '../hooks'
import  DOMPurify  from 'dompurify'

const Blogs = () => {
  const {blogs ,loading} = useBlogs() ;
  if(loading){
    return (
      <div>
        <div className='flex justify-center items-center h-screen text-4xl'>
          <Loader />
        </div>
      </div>
    )
  }
  return (
    <>
      <main className='p-5'>
        <NavBar />
        <div className='p-4  flex-col flex justify-center items-center'>
          {blogs.map((data,idx)=>{
             const sanitizedContent = DOMPurify.sanitize(data.content);
            return <BlogCard key={idx} id={data.id} authorName={data.author.name}  title={data.title} content ={sanitizedContent} publishedDate={data.createdAt.split("T")[0]} />
          })}
        </div>
      </main>

    </>
  )
}

export default Blogs