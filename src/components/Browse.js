import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';


const Browse = () => {

  useNowPlayingMovies();
  
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
      {/***
      *   Main Contanier
      *     -Video Background 
      *     - Video Title
      *   Secondary Container
      *      - Movieslist * N
      *      - Cards * N
       */}
    </div>
  )
}

export default Browse