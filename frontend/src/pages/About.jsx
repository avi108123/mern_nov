// Import React
import React from "react";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  return (
   <div>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          About Us
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Welcome to <span className="font-semibold">My Blog</span>, your number one source for insightful articles, creative ideas, and helpful tips. We are dedicated to bringing you the best content with a focus on quality, authenticity, and engagement.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Our team is passionate about sharing knowledge and inspiring our readers through thought-provoking and well-researched posts. Whether you're here for lifestyle advice, tech tutorials, or creative writing, we've got something for everyone.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Thank you for visiting <span className="font-semibold">My Blog</span>. We hope you enjoy reading our content as much as we enjoy creating it for you. Feel free to explore, comment, and share your thoughts with us!
        </p>
      </div>
    </div>
   </div>
  );
};

export default AboutPage;
