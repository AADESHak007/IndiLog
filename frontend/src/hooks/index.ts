import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";


export interface BlogsResponse {
    id: string,
    title: string,
    content: string,
    createdAt:string,
    author: {
        name: string ,
        email: string
    }
}
export const useBlog= ({id}:{id:string})=>{
    const [loading, setLoading] = useState(true) ;
    const [blog,setBlog]=useState<BlogsResponse | null>(null) ;
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}` ,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })
        .then(res => {
            setBlog(res.data.blog) ;
            setLoading(false) ;
        })
    },[id])
    return {
        loading,
        blog
    }
}



export const useBlogs =()=>{

    const [loading ,setLoading] =useState(true) ;
    const [blogs,setBlogs]=useState<BlogsResponse[]>([]) ;

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/get/all-blogs`,{ headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },}
        )
        .then(res => {
            setBlogs(res.data.blogs) ;
            setLoading(false) ;
        })
    }, [])
    

    return (
      {  loading ,
        blogs}
    )

}