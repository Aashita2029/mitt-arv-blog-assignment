import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';

function App() {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading app...</div>;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar__container">
          <Link to="/" className="navbar__brand">Blog Platform</Link>
          <div className="navbar__nav">
            {user ? (
              <>
                <Link to="/create-post" className="navbar__link">Create Post</Link>
                <Link to="/profile" className="navbar__link">Profile</Link>
                <button onClick={logout} className="button button--danger">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="navbar__link">Login</Link>
                <Link to="/signup" className="navbar__link">Signup</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route element={<PrivateRoute />}>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
