import React from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieList from './Components/MovieList'
import MovieDetailPage from './Components/MovieDetailPage'

const App = () => {
  return (
    <div className=''>
      <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='movie/:id' element={<MovieDetailPage/>} />
            <Route path='movies/:type' element={<MovieList/>} />
            <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>  
      
    </div>
  )
}

export default App