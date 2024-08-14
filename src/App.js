import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show loader for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <MovieList />
        </>
      )}
    </div>
  );
}

export default App;
