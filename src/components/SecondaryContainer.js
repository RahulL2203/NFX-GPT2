import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux' 

const SecondaryContainer = () => {
  const movies = useSelector(store=>store.movies)
  return (
    movies.nowPlayingMovies&& (
    <div className='bg-black'>
      <div className='-mt-48 relative z-20'>

     
      <MovieList title ={"Now Playing"} movies = {movies.nowPlayingMovies}/>
     
      <MovieList title ={"Trending Movies"} movies = {movies.nowPlayingMovies}/>
      <MovieList title ={"Popular Movies"} movies = {movies.popularMovies}/>
      <MovieList title ={"Romantic Movies"} movies = {movies.nowPlayingMovies}/>
      <MovieList title ={"Horror Movies"} movies = {movies.nowPlayingMovies}/>
      </div>

      {/**
       *  Movie List  - Popular
       *    - Movie Cards * N
       *  Movie List- Trending
       *  Movie List - Now Playing
       *  Movie List - Romantic
       * 
       */}
        
    </div>
    )
  )
}

export default SecondaryContainer