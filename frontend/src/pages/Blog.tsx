import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import DetailedBlog from "../components/DetailedBlog";
import Loader from "../components/Loader";

export const Blog = () =>{
 const {id} = useParams<{id:string}>() ;
  const {loading ,blog} = useBlog({
    id: id || "" ,
  }
  ) ;

  if(loading){
    return (
      <div>
        <div className='text-center h-screen flex justify-center items-center text-blue-500 text-4xl'>
          <Loader />
        </div>
      </div>
    )
  }
  if (!blog) {
    return (
        <div className="text-center h-screen flex justify-center items-center text-red-500 text-2xl">
            Blog not found.
        </div>
    );
}
    return (
        <div className="p-5">
          <DetailedBlog blog={blog}/>
        </div>
    )
}