import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ handleGoogleLogin }) => {


  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-200">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold flex justify-center cursor-pointer">MindMark
          </h1>
          <p className="text-gray-600 mt-2">Your gateway to smarter thoughts</p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-8">Login to Your Account</h2>

        <button
          onClick={handleGoogleLogin}
          className="w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-3 bg-blue-400 hover:bg-blue-300 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out"
        >

          <FcGoogle size={24} />

          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;