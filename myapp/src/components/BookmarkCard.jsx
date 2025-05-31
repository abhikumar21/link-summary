import React, { useState } from 'react';
import './Bookmark.css'

const BookmarkCard = ({ bookmark, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="bookmark border rounded p-4 bg-white shadow-sm sm:px-10 mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="text-green-600 text-xl sm:text-2xl break-words flex-1">
          {bookmark.title}
        </div>
        <button
          className="text-red-500 text-md font-semibold"
          onClick={() => onDelete(bookmark.id)}
        >
          Delete
        </button>
      </div>

      <div className="link mt-2">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 break-words"
        >
          {bookmark.url}
        </a>
      </div>

      <h2 className="text-xl font-bold mt-3">Summary</h2>
      <div className="description mt-1 flex flex-col relative">
        <p
          className={`bookmark-description text-sm mt-2 text-gray-700 break-words ${
            expanded ? 'h-full mb-6' : 'h-[250px] overflow-hidden'
          }`}
        >
          {bookmark.description}
        </p>

        {!expanded ? (
          <button
            className="read-more-btn absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold bg-transparent w-full z-10 after:content-[''] after:absolute after:h-[54px] after:left-0 after:right-0 after:bottom-0 after:bg-[linear-gradient(180deg,#ffffffa1,#fff,#fff)] after:-z-10"
            onClick={() => setExpanded(true)}
          >
            Read More
          </button>
        ) : (
          <button
            className="read-more-btn absolute bottom-0 left-1/2 transform -translate-x-1/2 text-blue-600 font-bold bg-transparent w-full z-10"
            onClick={() => setExpanded(false)}
          >
            Read Less
          </button>
        )}
      </div>
    </div>
  );
};

export default BookmarkCard;