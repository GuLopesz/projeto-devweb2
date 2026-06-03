import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Explorar from './pages/Explorar';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Questionario from "./pages/Questionario";
import Sobre from './pages/Sobre';
import Historias from './pages/Historias';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      
      <main style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explorar" element={<Explorar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/questionario" element={<Questionario />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/historias" element={<Historias />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;