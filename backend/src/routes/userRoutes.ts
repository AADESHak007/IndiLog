import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign } from "hono/jwt";
import { signInInput, signUpInput } from "@aadeshak10/common"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();



//sign up  route :
userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  try {
    const body = await c.req.json(); //accessing data 
    const { success } = signUpInput.safeParse(body);
    if (!success) {
      c.status(401)
      return c.json({
        msg: "Invalid input",
      })
    }
    //inserting the user details to the table
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      }
    })
    // creating and retruning the jwt token
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      token,
      name: user.name,
      email: user.email,
      id: user.id,
    })
  } catch (error) {
    c.status(403)
    console.log(error)
    return c.json({ msg: "error in setting up a user" })
  }
})

// sign in route :
userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json(); //accessing data
  const { success } = signInInput.safeParse(body);
  if (!success) {
    c.status(401)
    return c.json({
      msg: "Invalid input",
    })
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    },
    select: {
      id: true,
      email: true,
      name: true,
    }
  })
  if (!user) {
    c.status(401)
    return c.json({ message: 'Invalid credentials' });
  }
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    token,
    name: user.name,
    email: user.email,
    id: user.id,
  })
})
