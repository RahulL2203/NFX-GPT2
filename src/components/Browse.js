import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';





const Browse = () => {

  const showGPTSearch = useSelector(store=>store.gpt.showGPTSearch);

  useNowPlayingMovies();
  usePopularMovies();
  
  return (
    <div>
      <Header/>
      {
        showGPTSearch ?  (
        <GptSearch/>
        ) :(
        <>     
         <MainContainer/>
         <SecondaryContainer/>
      </>)

      }
     
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