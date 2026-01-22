import React, { useContext, useEffect, useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import chroma from 'chroma-js';
import axios from 'axios';
import { AppContext } from '../contexts/AppContexts.jsx';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { backendUrl, posts, setPosts, hasMore, setHasMore, setPreviousPage } = useContext(AppContext);

  const limit = 6;
  const navigate = useNavigate();
  const targetRef = useRef(null);

  const fetchPosts = async (isRefresh = false) => {
    if (isFetchingMore || (!hasMore && !isRefresh)) return;

    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsFetchingMore(true);
      }

      const lastPost = isRefresh ? null : posts[posts.length - 1];
      const afterId = lastPost ? lastPost._id : null;

      const res = await axios.get(
        `${backendUrl}/api/all-posts?limit=${limit}${afterId ? `&afterId=${afterId}` : ''}`
      );

      const newPosts = res.data.posts;

      setPosts((prev) => {
        if (isRefresh) return newPosts;
        const uniqueNewPosts = newPosts.filter(
          (post) => !prev.some((p) => p._id === post._id)
        );
        return [...prev, ...uniqueNewPosts];
      });

      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
      setIsRefreshing(false);
    }
  };

  // ------ INITIAL LOAD ------
  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts(true);
    } else {
      setLoading(false);
    }
  }, []);

  // ------ INTERSECTION OBSERVER ------
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isFetchingMore) {
          fetchPosts(false);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isFetchingMore, posts.length]);

  const handlePostClick = (postId) => {
    setPreviousPage('/all-posts');
    navigate(`/post/${postId}`);
  };

  return (
    <div className="p-4 sm:p-6 bg-blue-50 min-h-screen">

      <div className="flex justify-center items-center">
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold">All Posts</div>
          <div
            onClick={() => fetchPosts(true)}
            className={`bg-blue-800 text-white w-8 h-8 p-1 text-2xl rounded-full cursor-pointer flex justify-center items-center shadow-lg
              ${isRefreshing ? 'animate-spin pointer-events-none opacity-70' : ''}`}
          >⭮</div>
        </div>
      </div>

      {loading && posts.length === 0 ? (
        <div className="flex justify-center mt-20"><BeatLoader color="#64B5F6" /></div>
      ) : posts.length === 0 ? (
        <p className="text-center mt-10 text-gray-500">No posts found.</p>
      ) : (
        <>
          {/* POSTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {posts.map((entry) => (
              <article
                key={entry._id}
                onClick={() => { setPreviousPage('/'); navigate(`/post/${entry._id}`) }}
                className="bg-white border border-blue-200 rounded-xl shadow-md p-4 flex flex-col cursor-pointer transition-transform transform hover:scale-95 hover:bg-blue-50 duration-300"
              >
                <img
                  src={entry.uploadUrl}
                  alt="image"
                  className="h-72 w-full object-fill rounded-lg mb-3"
                />

                <div className="flex gap-1 text-sm mt-2">
                  <span className="font-semibold text-gray-600">Caption:</span>
                  <span className="text-black font-bold">{entry.caption}</span>
                </div>

                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">Posted on: </span>{new Date(entry.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                  {' '}
                  by <span className='font-medium'>{entry.email}</span>
                </div>

                <div className="text-sm mt-2">
                  <span className="font-semibold text-gray-600">Topics:-</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {entry.topic.map((grp, i) => (
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
              </article>
            ))}
          </div>

          {/* TARGET ELEMENT */}
          <div ref={targetRef} className="h-20 flex justify-center items-center">
            {isFetchingMore ? (
              <BeatLoader color="#64B5F6" />
            ) : (
              !hasMore && (
                <p className="text-center font-semibold text-gray-500">You have seen all the posts!</p>
              )
            )}
          </div>
        </>
      )}

      <div
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-6 bg-blue-800 text-white w-14 h-14 font-bold text-2xl rounded-full cursor-pointer flex justify-center items-center z-50 shadow-lg hover:scale-110 transition-transform"
      >↑</div>
    </div>
  );
};

export default AllPosts;
