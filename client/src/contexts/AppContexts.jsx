import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, provider } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [error, setError] = useState('');
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [userEmail, setUserEmail] = useState("");
  const [userPhoto, setUserPhoto] = useState("");


  const navigate = useNavigate();

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/new-posts`);
      setAllPosts(data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching entries.");
      setLoading(false);
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      setLoadingProfile(true);
      const { data } = await axios.post(
        `${backendUrl}/api/profile-data`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserEmail(data.user.email);
      setUserPhoto(data.user.userPhoto);
      setLoadingProfile(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const accessToken = await result.user.getIdToken();
      const user = result.user;

      setUserEmail(user.email);
      setToken(accessToken);
      localStorage.setItem("token", accessToken);

      fetchUserProfile(accessToken);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
      getAllPosts();
    }
  }, []);



  const handleLogout = async () => {
    try {
      await signOut(auth);
      setToken("");
      setUserEmail("");
      localStorage.removeItem("token");
      // localStorage.removeItem("userEmail");
      // localStorage.removeItem("userPhoto");
      navigate('/');

    } catch (error) {
      console.error("Logout Error:", error);
    }
  };


  const value = {
    loading,
    allPosts,
    backendUrl,
    getAllPosts,
    token,
    error,
    handleGoogleLogin,
    handleLogout,
    userEmail,
    userPhoto, loadingProfile
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
