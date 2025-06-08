import React, { useContext, useState } from 'react';
import emailjs from '@emailjs/browser';
import { AppContext } from '../contexts/AppContexts';

const FeedbackForm = () => {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const {userEmail}=useContext(AppContext);

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      alert("Email not found in local storage.");
      return;
    }

    setSending(true);

    const templateParams = {
      from_name: userEmail,
      to_name: 'MindMark',
      message,
    };

    try {
      await emailjs.send(
        'service_tnfzw8l',
        'template_fl49683',
        templateParams,
        'keFGYGYIjlqEVCsQh'
      );

      alert('Message sent successfully!');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
    

      <div className="flex items-center justify-center py-16 px-6">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-3xl w-full text-gray-800">
          <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Send Message</h1>

          <p className="text-lg mb-6 leading-relaxed text-center">
            We'd love to hear your thoughts, suggestions, or any issues you're facing. Your feedback helps us grow and improve.
          </p>

          <form onSubmit={sendEmail} className="space-y-5">
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={6}
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-400 text-white font-semibold cursor-pointer py-3 px-6 rounded-lg transition duration-200 shadow-md"
            >
              {sending ? 'Sending...' : 'Send'}
            </button>
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Message will be sent from: <span className="text-gray-700 font-medium">{userEmail || 'Not Found'}</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default FeedbackForm;
