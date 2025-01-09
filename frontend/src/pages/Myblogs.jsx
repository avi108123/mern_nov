import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const nevigate = useNavigate();

let token = localStorage.getItem("token");

let header = {
  Authorization :"Bearer "+token
}

  useEffect(()=>{
   axios.get('http://localhost:5000/blog/myblogs',{headers:header})
   .then((res)=>setBlogs(res.data))
   .catch((err)=>console.log(err))
  },[])

  const handleDelete = (id) => {
    axios.delete("http://localhost:5000/blog/delete",{headers:header,params:{id:id}}).then((res)=>{
      
      setBlogs(blogs.filter((blog)=> blog._id !=id))
    })
    .catch((err)=>console.log(err))
  };

  const handleUpdate = (blog) => {
    nevigate('/updateblog',{state:blog})
  };

  return (
   <div>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold mb-8 text-gray-800">My Blogs</h1>
        <Link to={'/createblog'}>
        <button
          
          className="mb-11 bg-indigo-600 text-white py-3 px-6 rounded-xl hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Create Blog
        </button>
        </Link>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:scale-105"
              >
                <img
                  src={blog.image.url}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">{blog.title}</h2>
               
                  <div className="mt-5 flex justify-between space-x-4">
                    <button
                      onClick={() => handleUpdate(blog)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-lg">You have not created any blogs yet.</p>
        )}
      </div>
    </div>
   </div>
  );
};

export default MyBlogPage;
