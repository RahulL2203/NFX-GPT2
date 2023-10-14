import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BACKGROUND_IMG } from '../utils/constants'

const GptSearch = () => {
  return (
    <div>
        <div className='absolute '>
            <img src={BACKGROUND_IMG}
            alt ="background"/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>

    </div>
  )
}

export default GptSearch