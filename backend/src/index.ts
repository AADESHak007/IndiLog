import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/userRoutes'
import { blogRouter } from './routes/blogRoutes'
import cloudinary from 'cloudinary-core';
import FormData from 'form-data';
import axios from 'axios';


const app = new Hono<
  {
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
      cloud_name:string;
      api_key:string;
      api_secret:string;
    }
  }
>()
// type CloudinaryUploadResponse = {
//   secure_url: string;
//   [key: string]: unknown; // To allow other keys from the response
// };


app.use('/*', cors());


app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


export default app
