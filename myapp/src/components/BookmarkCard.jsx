import React from 'react';

const BookmarkCard = ({ bookmark, onDelete }) => {
  return (
    <div className="border rounded p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
          {bookmark.title}
        </a>
        <button
          className="text-red-500 text-sm"
          onClick={() => onDelete(bookmark.id)}
        >
          Delete
        </button>
      </div>
      <p className="text-sm mt-2 text-gray-700">{bookmark.summary}</p>
    </div>
  );
};

export default BookmarkCard;