import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import AllPosts from './pages/all-posts';
import Contact from './pages/contact';
import Home from './pages/home';
import About from './pages/about-us';
import { AppContext } from './contexts/AppContexts';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PostDetails from './components/PostDetails';
import { useLocation } from 'react-router-dom';



const App = () => {
  const { token, handleGoogleLogin } = useContext(AppContext);
const location = useLocation();
const hide = location.pathname.includes("post/");

  if (!token) {
    return <LoginPage handleGoogleLogin={handleGoogleLogin} />
  }

  return (
    <>
    {!hide && <Navbar />}
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
      {!hide && <Footer />}
    </>
  );
}

export default App;


