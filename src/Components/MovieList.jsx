import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Cards from "./Cards";



const MovieList = () => {

    const [movieList, setMovieList] = useState([]);
    const {type} = useParams();

    useEffect(()=>{
        getData() 
    },[])

    useEffect(()=>{
        getData()
    },[type])

    const getData = () => {
        fetch(
      `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=b08248bc4b97d37e543fca2d4705eb6b&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results))
    }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 mt-18'>
        <h2 className='text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide'>{(type ? type : "POPULAR").toUpperCase()}</h2>
        <div className='
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            gap-2 
            md:gap-8'>
        {
            movieList.map(movie => (
                    <Cards movie={movie} key={movie.id} />
            )) 
        }
        </div>
    </div>
  )
}

export default MovieList