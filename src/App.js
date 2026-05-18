import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explorar from './pages/Explorar';

function App() {
  return (
    <Router>
      <Header />
      
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/expĺorar" element={<Explorar />} />
          
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;