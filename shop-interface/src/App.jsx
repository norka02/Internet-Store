import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/sites/Home';
import Products from './components/sites/Products';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/products' Component={Products} />
          <Route path='/' exact Component={Home}/>
        </Routes>
      </Router>
    </>
  )
}

export default App