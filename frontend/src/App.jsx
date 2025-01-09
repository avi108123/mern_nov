import React, { useContext, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import MyBlogPage from './pages/Myblogs'
import CreateBlogPage from './pages/CreateBlog'
import { ToastContainer } from 'react-toastify';
import UserContext from './UserContext'
import Notfound from './pages/Notfound'
import axios from 'axios'
import UpdateBlog from './pages/UpdateBlog'
import Blog from './pages/Blog'
const App = () => {
  let {user,setUser} = useContext(UserContext);

  let token = localStorage.getItem("token");

 {
  token &&
  useEffect(()=>{
    axios.get("http://localhost:5000/user/verify",{headers:{Token:token}})
    .then((res)=>setUser(res.data))
    .catch((err)=>console.log(err))
 },[])
 }


  return (
    <div>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/blog/:id' element={user?<Blog/>:<Login/>}/>



        {user && <Route path='/myblog' element={<MyBlogPage/>}/>}
       {user&&  <Route path='/createblog' element={<CreateBlogPage/>}/>}
       {user&&  <Route path='/updateblog' element={<UpdateBlog/>}/>}

        <Route path='/About' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/*' element={<Notfound/>}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App
