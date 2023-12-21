import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      test
      {/* <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact />
        </Routes>
      </Router> */}
      
      
     
    </>
  )
}

export default App