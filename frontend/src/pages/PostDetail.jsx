import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, deletePost } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, setLoading, setError, deletePost as deletePostAction } from '../store/slices/postsSlice';

// Helper function to format any date input into a locale string
const formatDate = (dateInput) => {
  if (!dateInput) return 'N/A';
  try {
    // Check if it's a Firebase Timestamp object
    if (dateInput.toDate) {
      return dateInput.toDate().toLocaleDateString();
    }
    // Otherwise, assume it's already a string or Date object
    return new Date(dateInput).toLocaleDateString();
  } catch (error) {
    console.error('Error formatting date:', dateInput, error);
    return 'Invalid Date';
  }
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { currentPost: post, loading, error } = useSelector(state => state.posts);

  useEffect(() => {
    const fetchPost = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getPost(id);
        console.log('Fetched post data in PostDetail:', data);
        dispatch(setCurrentPost(data));
      } catch (err) {
        dispatch(setError('Failed to fetch post'));
        console.error(err);
      }
    };

    // Fetch post only if it's not already in state or if ID changes
    if (!post || post.id !== id) {
       fetchPost();
    }
  }, [id, dispatch, post]); // Added 'post' to dependencies

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(id);
      navigate('/');
      dispatch(deletePostAction(id));
    } catch (err) {
      dispatch(setError('Failed to delete post'));
      console.error('Error deleting post:', err);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!post) return <div className="text-center">Post not found</div>;

  const isAuthor = user && post.authorId === user.uid;

  return (
    <div className="container">
      <article className="card">
        <h1 className="post-card__title text-center">{post.title}</h1>
        <div className="post-card__meta mb-4 text-center">
          By {post.authorName} • {formatDate(post.createdAt)}
        </div>
        <div className="post-card__content">
          {post.content}
        </div>
        {isAuthor && (
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to={`/edit-post/${id}`}
              className="button button--primary"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="button button--danger"
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </div>
  );
} 