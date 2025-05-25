import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/slices/postsSlice';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      const newPost = await createPost({ title, content, tags: tagsArray });
      dispatch(addPost(newPost));
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <h1 className="form__title text-center">Create New Post</h1>
        {error && <p className="form__error mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="title" className="form__label">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="content" className="form__label">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="10"
              className="form__input"
            />
          </div>
          <div className="form__group">
            <label htmlFor="tags" className="form__label">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="form__input"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="button button--primary w-full"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
} 