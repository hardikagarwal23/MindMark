import React, { useState, useRef, useContext } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
import axios from 'axios';
import { ClipLoader, PulseLoader} from 'react-spinners';
import { AppContext } from '../contexts/AppContexts';

const animatedComponents = makeAnimated();


const options = [
  { value: 'general', label: 'General', color: '#FF8F00' },
  { value: 'technology', label: 'Technology', color: '#1976D2' },
  { value: 'health', label: 'Health & Wellness', color: '#388E3C' },
  { value: 'mental-health', label: 'Mental Health', color: '#C2185B' },
  { value: 'education', label: 'Education', color: '#FBC02D' },
  { value: 'travel', label: 'Travel', color: '#D84315' },
  { value: 'personal-development', label: 'Personal Development', color: '#303F9F' },
  { value: 'career', label: 'Career', color: '#00796B' },
  { value: 'business', label: 'Business', color: '#F57C00' },
  { value: 'entertainment', label: 'Entertainment', color: '#E91E63' },
  { value: 'food', label: 'Food', color: '#5D4037' },
  { value: 'lifestyle', label: 'Lifestyle', color: '#673AB7' },
  { value: 'environment', label: 'Environment', color: '#689F38' },
  { value: 'gaming', label: 'Gaming', color: '#00BCD4' },
  { value: 'culture', label: 'Culture & Traditions', color: '#FF713C' },
  { value: 'creative-writing', label: 'Creative Writing', color: '#9C27B0' },
  { value: 'art', label: 'Art & Creativity', color: '#D32F2F' },
  { value: 'motivation', label: 'Motivation', color: '#EF6C00' },
  { value: 'relationships', label: 'Relationships', color: '#B71C1C' },
  { value: 'self-expression', label: 'Self Expression', color: '#006064' },
  { value: 'science', label: 'Science', color: '#0288D1' },
  { value: 'history', label: 'History', color: '#795548' },
  { value: 'philosophy', label: 'Philosophy', color: '#3F51B5' },
  { value: 'finance', label: 'Finance', color: '#2E7D32' },
  { value: 'gadgets', label: 'Gadgets', color: '#512DA8' },
  { value: 'productivity', label: 'Productivity', color: '#1E88E5' },
  { value: 'current-affairs ', label: 'Current Affairs', color: '#B71C1C' },
  { value: 'politics', label: 'Politics', color: '#5E35B1' },
  { value: 'parenting', label: 'Parenting', color: '#FFA000' },
  { value: 'life-lessons', label: 'Life Lessons', color: '#8E24AA' },
  { value: 'space', label: 'Space', color: '#501f94' },
  { value: 'sports', label: 'Sports', color: '#E64A19' },
  { value: 'wildlife', label: 'Wildlife', color: '#55903F' }
];


const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'pointer',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css(),
    };
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color,
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    cursor: 'pointer',
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white',
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    cursor: 'pointer',
  }),
  dropdownIndicator: (styles) => ({
    ...styles,
    cursor: 'pointer',
  }),
};

const AddPost = () => {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [postContent, setPostContent] = useState('');
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file,setFile]=useState(null);
  const [postUploading,setPostUploading]=useState(false);
  const fileInputRef = useRef();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { getAllPosts, token, userEmail } = useContext(AppContext);

  const handleImageChange = (e) => {
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  }
};
  
const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${backendUrl}/api/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.url;
    } catch (err) {
     console.error('Image upload failed:', err);
     return null;
    } finally {
      setUploading(false);
    }
  };

  
  const handleClick = () => {
    setLoading(true);
    autoPost().finally(() => setLoading(false));
  };

  const autoPost = async () => {
    if (!token) {
      alert('You must be logged in to generate.');
      return;
    }
    try {
      const res = await axios.post(
        `${backendUrl}/api/autoPost`,
        { description: description.trim() },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setCaption(res.data.caption);
      setPostContent(res.data.postContent);
    } catch (err) {
      alert('Server is busy. Please try again later.');
      console.error('Auto-post error:', err.response?.data || err.message);
    }
  };

  
  const addThisEntry = async () => {
    if (!token) {
      alert('You must be logged in to post.');
      return;
    }
    try {
      setPostUploading(true);
      const email = userEmail;
      const imageUrl = await handleUpload(file);
      if(!imageUrl){
        alert("Image upload failed. Please try again.");
        setPostUploading(false);
        return;
      }
      const res = await axios.post(`${backendUrl}/api/new-posts`, {
        email,
        topic,
        uploadUrl:imageUrl,
        caption,
        postContent,
      });
      setTopic([]);
      setCaption('');
      setPostContent('');
      setPreview(null);
      setDescription('');
      setPostUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      await getAllPosts();
    } catch (error) {
      console.log('Not added. Error:', error);
    }
  };

  return (
    <div className={`py-4 px-4 sm:px-8 md:px-24 bg-blue-100 w-full mx-auto mt-10 ${postUploading ? 'cursor-not-allowed pointer-events-none opacity-90'  : ''}`}>
      <div className={` relative z-50 flex flex-col md:flex-row gap-6 min-h-[500px] `}>
        
        {/* Image Upload Section */}
        <div className="w-full md:w-1/2 p-4 rounded-md bg-white shadow-md flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Image:</h2>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block file:cursor-pointer w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
          <div className="mt-4 flex-1 flex items-center justify-center bg-gray-50 rounded-md shadow-inner border border-dashed border-gray-300">
            {
             preview ? (
              (<img
                src={preview}
                alt="Preview"
                className="w-full h-full object-contain rounded-md shadow-lg"
              />) 
            ) : (
              <p className="text-lg text-gray-500 text-center p-8">
                🌟 Upload an image to begin!
              </p>
            )}
          </div>
        </div>

        {/* Post Section */}
        <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-4 flex flex-col">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              💡What's on your mind?
            </label>
            <input
              type="text"
              value={description}
              placeholder="Type your idea to generate a full post..."
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={handleClick}
            className={`px-4 py-2 text-sm rounded transition flex items-center justify-center gap-2
  ${description.trim()
                ? loading
                  ? 'bg-blue-500 text-white cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
                : 'bg-gray-300 text-gray-500 pointer-events-none'
              }`}>
            {loading ? (
              <>
                <ClipLoader size={20} color="#ffffff" />
                Generating...
              </>
            ) : (
              '✨ Generate Caption & Content'
            )}
          </button>

          <div className="my-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">Caption:</label>
            <input
              type="text"
              value={caption}
              placeholder="Write a caption..."
              onChange={(e) => setCaption(e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="block text-gray-700 text-sm font-medium mb-2">Post Content:</label>
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Write your post content here..."
              className="w-full h-full border border-gray-300 rounded px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-2 ">Select topic:</label>
            <Select
              isMulti
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={options}
              styles={colourStyles}
              value={topic}
              onChange={setTopic}
            />
          </div>
        </div>
        
      </div>

      {/*add button*/}
      { preview && caption && postContent && topic.length > 0 && (
        <div
          onClick={addThisEntry}
          className="flex justify-center items-center bg-white p-4 shadow-lg rounded-md mt-4 hover:bg-gray-100 cursor-pointer"
        >
          {postUploading ? <PulseLoader color="#64B5F6" className='p-0.5'  /> : 'Add Post'} 
        </div>
      )}
    </div>
  );
};

export default AddPost;
