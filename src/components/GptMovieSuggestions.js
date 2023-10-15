import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestions = () => {

  const {movieNames, movieResults} = useSelector((store) => store.gpt);

  if(!movieNames) return null;
  return (
    <div className='text-white p-4 mt-[20%] md:mt-[8%] bg-black flex absolute bg-opacity-70'> 
      <div className='w-screen m-0'>
        {movieNames.map((movieName,index)=><MovieList key={movieName} title ={movieName} movies ={movieResults[index]}/>)}
        
      </div>
    </div>
  )
}

export default GptMovieSuggestions;