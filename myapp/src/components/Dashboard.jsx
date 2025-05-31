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

  const extractTitleFromSummary = ({summary, url}) => {
    const lines = summary.split('\n').map(line => line.trim());
    let title = url;
    const contentLines = [];

    for (const line of lines) {
      if (line.toLowerCase().startsWith('title:')) {
        title = line.replace(/^title:\s*/i, '');
      } else {
        contentLines.push(line);
      }
    }

    const description = contentLines.join('\n').trim();
    console.log('Extracted title:', title);
    console.log('Extracted description:', description);
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
    <div className="container bg-violet-300">
      <div className="content px-50 py-10">
        <div className="head bg-slate-200 px-10 pt-5 pb-2">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Link Saver</h1>
                <button onClick={logout} className="text-lg bg-orange-500 text-white px-4 py-2 rounded-lg">Logout</button>
            </div>
            <div className="flex mb-4 gap-2">
                <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste a URL..."
                className="input flex-1 px-3 py-2 border-1 rounded-md"
                />
                <button onClick={handleSave} className="btn text-blue-800 font-bold" disabled={loading}>
                {loading ? 'Saving...' : 'Save & Summarize'}
                </button>
            </div>
        </div>

        <div className="">
            {bookmarks.map((b) => (
            <BookmarkCard key={b.id} bookmark={b} onDelete={handleDelete} />
            ))}
        </div>
      </div>
     </div>
  );
};

export default Dashboard;