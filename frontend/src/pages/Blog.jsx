import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const header = {
      Authorization: "Bearer " + token,
    };

    axios
      .get('http://localhost:5000/blog/getblog', { headers: header, params: { id: id } })
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  console.log(blog);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        {blog ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h1 className="text-2xl font-bold mb-2 text-gray-800">{blog.title}</h1>
            <p className="text-gray-600 mb-4">{blog.description}</p>
            <div className="text-sm text-gray-500">Created at: {new Date(blog.createdAt).toLocaleString()}</div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500 text-lg">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
