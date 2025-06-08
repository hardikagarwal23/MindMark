import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContexts';
import chroma from 'chroma-js';
import { BeatLoader } from 'react-spinners';

const NewPosts = () => {
  const { allPosts, loading, getAllPosts, error } = useContext(AppContext);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleClick = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedEntry ? 'hidden' : 'auto';
  }, [selectedEntry]);



  return (
    <div className={`p-4 sm:p-6 bg-blue-50 min-h-screen`}>
      <h2 className="text-3xl font-bold text-center mb-8">New Posts</h2>

      {loading && <div className="flex justify-center mt-4">
        <BeatLoader color="#64B5F6" />
      </div>}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allPosts.slice(0, 18).map((entry, idx) => (
          <article
            key={idx}
            onClick={() => handleClick(entry)}
            className="bg-white border border-blue-200 rounded-xl shadow-md p-4 flex flex-col cursor-pointer transition-transform transform hover:scale-95 hover:bg-blue-50 duration-300"
          >
            <img
              src={entry.uploadUrl}
              alt="Diary"
              className="h-72 w-full object-cover rounded-lg mb-3"
            />

            <div className="flex gap-1 text-sm mt-2">
              <span className="font-semibold text-gray-600">Caption:</span>
              <span className="text-black font-semibold">{entry.caption}</span>
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

      {selectedEntry && (
        <div className="fixed inset-0 bg-blue-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg max-h-[95vh] overflow-auto relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-1 right-3 text-black cursor-pointer hover:scale-125 transition-all"
            >
              ✘
            </button>
            <img
              src={selectedEntry.uploadUrl}
              alt="Diary"
              className="w-full h-full object-cover rounded mb-4"
            />
            <div className="text-base mt-2">
              <span className="text-black font-semibold">{selectedEntry.caption}</span>
            </div>

            <div className="text-sm text-gray-600 mt-1">
              <span className="font-semibold">Posted on: </span>{new Date(selectedEntry.date).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
              {' '}
              by <span className='font-medium'>{selectedEntry.email}</span>
            </div>

            <div className="text-sm whitespace-pre-wrap mt-2">{selectedEntry.postContent}</div>

            <div className="text-sm mt-2">
              <span className="font-semibold text-gray-600">Topics:-</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {selectedEntry.topic.map((grp, i) => (
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
      )}
    </div>
  );
};

export default NewPosts;
