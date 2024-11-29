import { createBlog, updateBlog } from "@aadeshak10/common";
import { Prisma, PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";



export const blogRouter = new Hono<{
    Bindings :{
        DATABASE_URL: string;
        JWT_SECRET:string ;
    },
    Variables:{
        userId:string ;
    }

}>() ;

blogRouter.use('/*', async (c ,next) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const header = c.req.header("Authorization")||"" ;
  
    const token = header.split(" ")[1] ;
  
    const user = await verify(token ,c.env.JWT_SECRET) ;
    if(user){
        //@ts-ignore
        c.set("userId" ,user.id) ;
        await next() ;
    }else{
        c.status(401)
        return c.json({message:'Invalid token'})
    }
  })

//posting the blog : **changing the name of the routes for code readability
blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json() ;
    const {success} = createBlog.safeParse(body);
    if(!success) {
        c.status(400)
        return c.json({message:"Invalid blog data"})
    }
    const authorId  = c.get("userId") ;

    try {
       const blog = await prisma.blog.create({
            data:{
                title:body.title ,
                content:body.content ,
                authorId:authorId , 
            }
        })
        c.status(201) 
        return c.json({
            id:blog.id
        })
    } catch (error) {
        c.status(403)
        return c.json({message:"error while creating the blog"})
    }
    
  })
  

  //updating or editing a blog :
  blogRouter.put('/',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json() ;
    const {success} = updateBlog.safeParse(body);
    if(!success) {
        c.status(400)
        return c.json({message:"Invalid blog data"})
    }

    try {
       const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
                title:body.title ,
                content:body.content , 
            }
        })
        c.status(201) 
        return c.json({
            id:blog.id
        })
    } catch (error) {
        c.status(403)
        return c.json({message:"error while updating the blog"})
    }
  })

  //applying pagination to filter the blogs : 

  blogRouter.get('get/all-blogs',async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
   try {
     const blogs =await prisma.blog.findMany({
         select:{
             content:true, 
             title:true,
             id:true,
             createdAt:true ,
             author:{
                 select:{
                     name:true,
                 }
             }
         }
     }) ;
 
     return c.json({
         blogs ,
     })
   } catch (error) {
    console.log(error) ;
    return c.json({msg:"error while fetching the blogs"})
   }
  })
  
  //getting the blog : 
  
  blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const id =  c.req.param("id") ;

    try {
       const blog = await prisma.blog.findFirst({
        where:{
            id:id,
        },
        select: {
            id:true ,
            title:true,
            content:true,
            createdAt:true,
            author:{
                select:{
                    name:true,
                    email:true,
                }
            }
        }
        })
        c.status(201) 
        // console.log(blog) 
        return c.json({
            blog,
        })
    } catch (error) {
        c.status(403)
        return c.json({message:"error while finding the blog"})
    }
  })
  blogRouter.delete('/deleteBlog',async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
      }).$extends(withAccelerate())
     const blogId = c.req.header("blogId") ;
    try {
        const response =await prisma.blog.delete({
            where:{
                id:blogId
            }
        })
        c.status(200)
        return c.json({success:true,message:"successfully deleted the blog"})
    } catch (error) {
        c.status(511) ;
        return c.json({message:"error while deleting the blog"})
    }
  })

  