import React, { useState, useEffect } from 'react';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');


//   const fetchTitle = async (url) => {
//     const res = await fetch(url);
//     const html = await res.text();
//     const match = html.match(/<title>(.*?)<\/title>/is);
//     return match ? match[1] : 'No Title';
//   };

  const getSummary = async (url) => {
    try {
      const response = await fetch('https://r.jina.ai/' + encodeURIComponent(url));
      const summary = await response.text();
      console.log(summary)
      return summary;
    } catch (err) {
      return 'Summary temporarily unavailable.';
    }
  };

  const handleSave = async () => {
    if(!isValidUrl(url)) {
        alert('Invalid URL');
        return;
    }

    // const title = await fetchTitle(url);
    const summary = await getSummary(url);
    // setTitle(title);
    setSummary(summary);
  }


  return (
    <div className="p-6 max-w-3xl mx-auto">

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Link Saver</h1>
      </div>
      <div className="flex mb-4 gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste a URL..."
          className="input flex-1"
        />
        <button className="btn" onClick={handleSave}>
          Save and Summarize
        </button>        
      </div>

      <div className="link-data">
        {summary && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Summary:</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;