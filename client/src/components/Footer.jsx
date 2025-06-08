import React from "react";
import { FaGlobe, FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-300 text-gray-800 py-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold flex justify-center cursor-pointer">
          MindMark  </h2>
        <p className="mt-2 text-sm text-gray-700">Let your thoughts flow freely, for within them lies the truth of who you are.</p>

        <nav className="mt-6 flex justify-center flex-wrap gap-6 text-sm font-medium">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blue-900">Home</Link>
          <Link to="/all-posts" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blue-900">Posts</Link>
          <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blue-900">About</Link>
          <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-blue-900">Contact</Link>
        </nav>

        <div className="mt-6 flex justify-center space-x-5 text-2xl ">
          <a href="#" className="hover:text-blue-900"><FaGlobe /></a>
          <a href="#" className="hover:text-blue-900"><FaInstagram /></a>
          <a href="#" className="hover:text-blue-900"><FaXTwitter /></a>
        </div>

        <p className="mt-8 text-xs text-gray-600">
          &copy; {new Date().getFullYear()} MindMark. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;