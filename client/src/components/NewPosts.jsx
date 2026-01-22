import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContexts';
import chroma from 'chroma-js';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const NewPosts = () => {
  const { allPosts, loading, setPreviousPage, getAllPosts } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className={`p-4 sm:p-6 bg-blue-50 min-h-screen`}>
      <h2 className="text-3xl font-bold text-center mb-8">New Posts</h2>

      {loading && <div className="flex justify-center mt-4">
        <BeatLoader color="#64B5F6" />
      </div>}

      {!loading && allPosts.length === 0 && <p className="text-center text-red-500">Error fetching posts.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.map((entry) => (
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


    </div>
  );
};

export default NewPosts;




