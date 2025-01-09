// Import React and useState hook
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios"
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const UpdateBlog = () => {
               const {state} = useLocation();
               console.log(state)

  const [title, setTitle] = useState(state.title);
  const [description, setDescription] = useState(state.description);
  const [image, setImage] = useState(null);
  const[f,setF] =useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
   
     let formdata = new FormData();

     f&& formdata.append("image",image),
     f&& formdata.append("publicId",state.image.publicId),
     formdata.append("title",title)
     formdata.append("description",description)
     formdata.append("flag",f)




    let token = localStorage.getItem("token");

    let header = {
      Authorization: "Bearer "+token,
    }
       
    axios.put("http://localhost:5000/blog/update",formdata,{headers:header,params:{id:state._id}})
    .then((res)=>toast("updated successfully"))
    .catch((err)=>console.log(err))

 
    // setTitle("");
    // setDescription("");
    // setImageLink("");
  };

  return (
    <div>
        <Navbar/>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Update Blog
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Blog Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageLink"
              className="block text-gray-700 font-medium mb-2"
            >
              Image Link
            </label>
            <input
              type="file"
              id="imageLink"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
             
              onChange={(e) => {
                setF(true);
                setImage(e.target.files[0])
              }}
             
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default UpdateBlog;
