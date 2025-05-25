import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';
import { useDispatch } from 'react-redux';
import { updatePost as updatePostAction } from '../store/slices/postsSlice';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(id);
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags ? data.tags.join(', ') : '');
      } catch (err) {
        setError('Failed to fetch post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    try {
      const updatedPost = await updatePost(id, { title, content, tags: tagsArray });
      dispatch(updatePostAction(updatedPost));
      navigate(`/post/${id}`);
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container">
      <div className="form">
        <h1 className="form__title text-center">Edit Post</h1>
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
            {loading ? 'Updating...' : 'Update Post'}
          </button>
        </form>
      </div>
    </div>
  );
} 