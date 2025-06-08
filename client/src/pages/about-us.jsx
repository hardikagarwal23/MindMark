import React from 'react';

const About = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">

      <div className="flex items-center justify-center py-16 px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-3xl text-gray-800">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">About Us</h1>

          <p className="text-lg mb-4 leading-relaxed">
            <strong>MindMark</strong> is a simple yet powerful platform for expression. Whether you're writing personal thoughts, life stories, opinions, or creative content — MindMark gives you the freedom to share and be heard.
          </p>

          <p className="text-lg mb-4 leading-relaxed">
            We believe every person has a voice that matters. Our mission is to create a respectful and open space where users can write freely, discover new ideas, and connect with others through honest expression.
          </p>

          <p className="text-lg mb-4 leading-relaxed">
            Whether you're here to reflect, inspire, or simply explore — MindMark welcomes you. Your words have power, and your presence adds meaning to our growing community. We’re especially passionate about thoughtful storytelling and authentic conversations.
          </p>

          <p className="text-lg font-semibold text-blue-400 text-center mt-6">
            Thank you for being a part of our journey.
          </p>
        </div>
      </div>

    </div>
  );
};

export default About;

