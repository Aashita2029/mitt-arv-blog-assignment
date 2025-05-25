import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setLoading, setError } from '../store/slices/postsSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { getPosts } from '../services/api';

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

export default function Home() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getPosts();
        console.log('Fetched posts data in Home:', data);
        dispatch(setPosts(data));
      } catch (err) {
        dispatch(setError('Failed to fetch posts'));
        console.error('Error fetching posts:', err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (posts.length === 0) {
      fetchPosts();
    }
  }, [dispatch, posts.length]);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <p className="form__error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="post-list__title">Blog Posts</h1>
      <div className="grid post-list__grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <h2 className="post-card__title">{post.title}</h2>
            <div className="post-card__meta">
              <span className="post-card__author">By {post.authorName}</span>
              <span className="post-card__date">{formatDate(post.createdAt)}</span>
            </div>
            <p className="post-card__excerpt">
              {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
            </p>
            {post.tags && post.tags.length > 0 && (
              <div className="post-card__tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-card__tag">{tag}</span>
                ))}
              </div>
            )}
            <div className="post-card__actions">
              <Link
                to={`/post/${post.id}`}
                className="button button--primary button--small"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </div>
      {posts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No posts available. Create one!</p>
      )}
    </div>
  );
} 