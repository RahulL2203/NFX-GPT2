import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BACKGROUND_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <>
    <div className='-z-10 fixed '>
      <img  className='object-cover h-screen md:h-fit'
        src={BACKGROUND_IMG}
          alt ="background"/>
    </div>
    <div className=''>
        <GptSearchBar/>
        <GptMovieSuggestions/>

    </div>
    </>
   
  )
}

export default GptSearch