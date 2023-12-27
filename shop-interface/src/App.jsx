import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Home from './components/sites/Home';
import Products from './components/sites/Products';
import About from './components/sites/About';
import Basket from './components/sites/Basket';
import Contact from './components/sites/Contact';
import Footer from './components/Footer';
import PurchaseForm from './components/PurchaseForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/about' Component={About} />
          <Route path='/products' Component={Products} />
          <Route path='/contact' Component={Contact} />
          <Route path='/basket' Component={Basket} />
          <Route path='/purchase-form' Component={PurchaseForm}/>
        </Routes>
      </Router>
    </>
  )
}

export default App