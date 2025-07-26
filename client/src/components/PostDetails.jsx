import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContexts.jsx';
import chroma from 'chroma-js';
import { BeatLoader } from 'react-spinners';
import { useNavigate, useParams } from 'react-router-dom';
import { MdShare } from 'react-icons/md';

const PostDetails = () => {
  const { id } = useParams();
  const { backendUrl, previousPage } = useContext(AppContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/post/${id}`);
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url: window.location.href });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return loading ? (<div className='flex justify-center items-center h-screen'><BeatLoader color="#64B5F6" /></div>) : (

    <div className="bg-blue-50 py-6 flex justify-center items-center">
      <div className=" bg-white p-6 rounded-xl w-full max-w-3xl overflow-auto relative shadow-xl">
        <button
          onClick={() => { previousPage ? navigate(-1) : navigate('/') }}
          className="absolute text-2xl top-1 right-0.5 text-black cursor-pointer hover:scale-110 transition-all duration-100"
        >
          ✘
        </button>
        <img
          src={post.uploadUrl}
          alt=""
          className="w-full h-full max-h-[500px] object-fill rounded mb-4 "
        />
        <div className="text-xl mt-2 flex justify-start items-center gap-x-1">
          <span className="text-black font-bold">{post.caption}</span>
          <button className='cursor-pointer' title="Share this post" onClick={() => handleShare(post)} ><MdShare className="hover:text-blue-600" size={24} /></button>
        </div>

        <div className="text-base text-gray-600 mt-1">
          <span className="font-semibold">Posted on: </span>{new Date(post.date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
          {' '}
          by <span className='font-medium'>{post.email}</span>
        </div>

        <div className="font-serif text-base text-gray-800 mt-2 whitespace-pre-wrap">{post.postContent}</div>

        <div className="text-sm mt-2">
          <span className="font-semibold text-gray-600">Topics:-</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {post.topic.map((grp, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-sm"
                style={{
                  color: grp.color,
                  backgroundColor: chroma(grp.color).alpha(0.1).css(),
                }}
              >
                {grp.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;


