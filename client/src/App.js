import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feed, setFeed] = useState([]);
  const [activePost, setActivePost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load all posts when the app starts
  useEffect(() => {
    axios.get('/api/index.php')
      .then(res => {
        setFeed(res.data.feed || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch feed", err);
        setLoading(false);
      });
  }, []);

  // Fetch a single post's details (views, comments) when clicked
  const loadPost = (id) => {
    setLoading(true);
    axios.get(`/api/index.php?id=${id}`)
      .then(res => {
        setActivePost(res.data);
        setLoading(false);
      });
  };

  if (loading) return <div className="loading">Summoning the darkness...</div>;

  return (
    <div className="blog-wrapper">
      <header>
        <h1 
          className="horror-title" 
          onClick={() => setActivePost(null)} 
          style={{cursor: 'pointer'}}
          title="Click to return to feed"
        >
          VELVET WHISPER
        </h1>
      </header>

      {activePost && activePost.post ? (
        /* --- SINGLE POST VIEW --- */
        <div className="single-post-view">
          <button className="back-btn" onClick={() => setActivePost(null)}>
            ← Back to the shadows
          </button>
          <main className="post-content">
            <h2>{activePost.post.title}</h2>
            <p className="views-count">
              👁 {activePost.views} views | ✍️ By {activePost.post.username}
            </p>
            <article>{activePost.post.content}</article>
          </main>

          <section className="comments-section">
            <h3>Whispers</h3>
            {(activePost.comments && activePost.comments.length > 0) ? (
              activePost.comments.map((c, i) => (
                <div key={i} className="comment-box">
                  <strong>{c.author}:</strong> {c.text}
                </div>
              ))
            ) : (
              <div className="no-comments">No one has whispered yet.</div>
            )}
          </section>
        </div>
      ) : (
        /* --- FEED VIEW --- */
        <div className="feed-view">
          {feed.map(post => (
            <div key={post.id} className="feed-card" onClick={() => loadPost(post.id)}>
              <h2>{post.title}</h2>
              <p className="author-tag">Written by {post.username}</p>
              <p className="preview-text">{post.content.substring(0, 60)}...</p>
              <span className="read-more">Read the full entry →</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;