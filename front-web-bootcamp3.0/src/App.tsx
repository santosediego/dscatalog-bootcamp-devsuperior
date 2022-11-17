import React from 'react';
import './assets/styles/custom.scss';
import './App.css';
import Navbar from 'components/Navbar';
import Home from 'assets/pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}

export default App;
