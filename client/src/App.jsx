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


const App = () => {
  const { token, handleGoogleLogin } = useContext(AppContext);


  if (!token) {
    return <LoginPage handleGoogleLogin={handleGoogleLogin} />
  }

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;


