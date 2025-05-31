import React, { useState, useEffect } from 'react';
import BookmarkCard from './BookmarkCard';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Dashboard = ({ setIsAuthenticated }) => {
  const [url, setUrl] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarks')) || [];
    setBookmarks(saved);
  }, []);

const extractTitleFromSummary = ({ summary, url }) => {
  const lines = summary.split('\n').map(line => line.trim());
  let title = url;
  const contentLines = [];

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    // Check and extract title
    if (lowerLine.startsWith('title:')) {
      title = line.replace(/^title:\s*/i, '').trim();
    } 
    // Skip line if it's exactly the URL or contains the URL
    else if (line === url || line.includes(url)) {
      continue;
    } 
    // Otherwise, include the line in description
    else {
      contentLines.push(line);
    }
  }

  const description = contentLines.join('\n').trim();

  console.log('Extracted title:', title);
  console.log('Cleaned description:', description);

  return { title, description };
};



  const getSummary = async (url) => {
    try {
      const response = await fetch('https://r.jina.ai/' + encodeURIComponent(url));
      return await response.text();
    } catch (err) {
      return 'Summary temporarily unavailable.';
    }
  };

  const handleSave = async () => {
    if (!isValidUrl(url)) {
      alert('Invalid URL');
      return;
    }
    setLoading(true);
    const summary = await getSummary(url);
    const {title, description} = extractTitleFromSummary({summary, url});
    const newBookmark = {
      id: Date.now(),
      url,
      title,
      description,
      createdAt: new Date().toISOString(),
    };
    const updated = [newBookmark, ...bookmarks];
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
    setUrl('');
    setLoading(false);
  };

  const handleDelete = (id) => {
    const updated = bookmarks.filter((b) => b.id !== id);
    setBookmarks(updated);
    localStorage.setItem('bookmarks', JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };


  return (
    <div className="container mx-auto bg-violet-300 min-h-screen px-4">
      <div className="content max-w-4xl mx-auto py-10">
        <div className="head bg-slate-200 px-6 sm:px-10 pt-5 pb-2 rounded-lg shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-2xl font-bold text-center sm:text-left">Link Saver</h1>
            <button
              onClick={logout}
              className="text-lg bg-orange-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
          <div className="flex flex-col sm:flex-row mb-4 gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a URL..."
              className="input flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
            />
            <button
              onClick={handleSave}
              className="btn text-blue-800 font-bold px-4 py-2 bg-white border border-blue-800 rounded-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & Summarize'}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {bookmarks.map((b) => (
            <BookmarkCard key={b.id} bookmark={b} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;