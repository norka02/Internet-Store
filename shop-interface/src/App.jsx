import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/sites/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home}/>
        </Routes>
      </Router>
    </>
  )
}

export default App