import z from 'zod' ;

//user routes..
export const signUpInput = z.object({
    name:z.string() ,
    email:z.string().email() ,
    password:z.string().min(6),

})
export type SignupInput =z.infer<typeof signUpInput> ;

export const signInInput = z.object({
    email:z.string().email() ,
    password:z.string().min(6),

})
export type SignInInput =z.infer<typeof signInInput> ;

//blog routes...
export const createBlog =z.object({
    title:z.string(),
    content:z.string(),
})

export type CreateBlogInput = z.infer<typeof createBlog> ;


export const updateBlog =z.object({
    title:z.string(),
    content:z.string(),
    id:z.string()
})

export type UpdateBlogInput = z.infer<typeof updateBlog> ;


