import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
   
  return (
    <div className='px-6' >
         <h1 className='px-2 text-xl py-2 text-white'>{title}</h1>
        <div className="flex overflow-x-scroll">
           

        <div className="flex px-2">
            {movies && movies.map((movie)=> <MovieCard key = {movie?.id} posterPath={movie?.poster_path}/>)}
           
        </div>
        
      </div>
    </div>
  )
}

export default MovieList