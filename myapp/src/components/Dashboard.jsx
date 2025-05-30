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

  const fetchTitle = async (url) => {
    const res = await fetch(url);
    const html = await res.text();
    const match = html.match(/<title>(.*?)<\/title>/is);
    return match ? match[1] : 'No Title';
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
    const title = await fetchTitle(url);
    const summary = await getSummary(url);
    const newBookmark = {
      id: Date.now(),
      url,
      title,
      summary,
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
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Link Saver</h1>
        <button onClick={logout} className="text-sm text-red-500">Logout</button>
      </div>
      <div className="flex mb-4 gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL..."
          className="input flex-1"
        />
        <button onClick={handleSave} className="btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save & Summarize'}
        </button>
      </div>
      <div className="grid gap-4">
        {bookmarks.map((b) => (
          <BookmarkCard key={b.id} bookmark={b} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;