import { auth } from '../firebase';

const API_URL = 'http://localhost:5000/api';

// Helper function to get auth header
const getAuthHeader = async () => {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (!token) {
      console.error('Authentication token not available.');
      // Depending on requirements, you might want to throw an error here
      return {}; // Return empty headers if no token, backend should handle unauthorized
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  } catch (error) {
    console.error('Error getting auth token:', error);
    throw new Error('Failed to get authentication token.');
  }
};

// Auth API
export const signup = async (email, password, displayName) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName })
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Signup API error:', error);
      throw new Error(error.error || 'Failed to sign up');
    }
    return response.json();
  } catch (error) {
    console.error('Error during signup API call:', error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Login API error:', error);
      throw new Error(error.error || 'Failed to log in');
    }
    return response.json();
  } catch (error) {
    console.error('Error during login API call:', error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    if (!response.ok) {
      const error = await response.json();
      console.error('Verify Token API error:', error);
      throw new Error(error.error || 'Failed to verify token');
    }
    return response.json();
  } catch (error) {
    console.error('Error during verify token API call:', error);
    throw error;
  }
};

// Posts API
export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
     if (!response.ok) {
      const error = await response.json();
      console.error('Get Posts API error:', error);
      throw new Error(error.error || 'Failed to fetch posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error during get posts API call:', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
     if (!response.ok) {
      const error = await response.json();
      console.error('Get Post API error:', error);
      throw new Error(error.error || 'Failed to fetch post');
    }
    return response.json();
  } catch (error) {
    console.error('Error during get post API call:', error);
    throw error;
  }
};

export const createPost = async (postData) => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData)
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Create Post API error:', error);
      throw new Error(error.error || 'Failed to create post');
    }
    return response.json();
  } catch (error) {
    console.error('Error during create post API call:', error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(postData)
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Update Post API error:', error);
      throw new Error(error.error || 'Failed to update post');
    }
    return response.json();
  } catch (error) {
    console.error('Error during update post API call:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Delete Post API error:', error);
      throw new Error(error.error || 'Failed to delete post');
    }
    return response.json();
  } catch (error) {
    console.error('Error during delete post API call:', error);
    throw error;
  }
};

// User API
export const getUserProfile = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/users/profile`, {
      headers
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Get User Profile API error:', error);
      throw new Error(error.error || 'Failed to fetch profile');
    }
    return response.json();
  } catch (error) {
    console.error('Error during get user profile API call:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profileData)
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Update User Profile API error:', error);
      throw new Error(error.error || 'Failed to update profile');
    }
    return response.json();
  } catch (error) {
    console.error('Error during update user profile API call:', error);
    throw error;
  }
};

export const getUserPosts = async () => {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_URL}/users/posts`, {
      headers
    });
     if (!response.ok) {
      const error = await response.json();
      console.error('Get User Posts API error:', error);
      throw new Error(error.error || 'Failed to fetch user posts');
    }
    return response.json();
  } catch (error) {
    console.error('Error during get user posts API call:', error);
    throw error;
  }
}; 