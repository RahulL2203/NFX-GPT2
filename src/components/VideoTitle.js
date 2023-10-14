import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black'>
      <h1 className='font-bold text-4xl'> {title}</h1>
      <p className='w-5/12 py-4 text-lg'>{overview}</p>
      <div className='mx-4'>
        
        <button className='bg-white text-black px-10 py-3 rounded-lg hover:bg-opacity-80'> ▶️ Play</button>
        <button className='bg-gray-500 text-white px-10 py-3 rounded-lg mx-2 hover:bg-opacity-70 '>  More Info</button>
      </div>
    </div>
  )
}

export default VideoTitle 