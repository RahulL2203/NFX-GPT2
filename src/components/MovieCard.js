import React from 'react'
import { POSTER_IMG_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {

  if(!posterPath) return null;
  return (
    <div className='pr-5 w-48'>
        <img alt = "Moviecard img"
        src= {POSTER_IMG_CDN_URL + posterPath}/>
    </div>
  )
}

export default MovieCard