// Import React and other required modules
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import UserContext from "../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Homepage = () => {
  let {user} = useContext(UserContext);
   const[blogs,setBlogs] =useState([]);

   useEffect(()=>{
     axios.get("http://localhost:5000/blog")
     .then((res)=>setBlogs(res.data))
     .catch((err)=>console.log(err))
    // fetch("http://localhost:5000/blog")
    // .then((res)=>res.json())
    // .then((data)=>setBlogs(data))
    // .catch((err)=>console.log(err))
   },[])




  return (
    <div className="min-h-screen bg-gray-100">
     <Navbar/>

      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          {user && <h2 className="text-4xl font-bold mb-4">Welcome {user.name}</h2>}
          <p className="text-lg">Discover articles, tutorials, and insights on web development, design, and more.</p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sample Blog Post */}
            {blogs.map((post) => (
              <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={post.image.url}
                  alt="Blog Post"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold text-gray-800">{post.title}</h4>
                  
                  <Link
                    to={'/blog/'+post._id}
                    className="text-blue-500 hover:text-blue-700 font-semibold mt-4 block"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
