
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Blog } from './pages/Blog'
import Blogs from './pages/Blogs'
import NewBlog from './pages/NewBlog'
import UpdateBlog from './pages/UpdateBlog'
import Home from './pages/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/signup' element={<SignUp />}/>
          <Route path='/blog/:id' element={<Blog />}/>
          <Route path='/blogs' element={<Blogs />}/>
          <Route path='/publish' element={<NewBlog />}/>
          <Route path='/updateblog/:id' element={<UpdateBlog />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
