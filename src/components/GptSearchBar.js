import React from 'react'
import { useSelector } from 'react-redux'
import lang from "../utils/languageConstants"

const GptSearchBar = () => {

  const langKey = useSelector((store)=>store.config.lang);

  return (
    <div className='pt-[10%] flex justify-center'> 
        <form 
         onSubmit={(e)=>e.preventDefault()}
        className='absolute bg-black w-1/2 grid grid-cols-12 text-white rounded-xl bg-opacity-80'>  
           
            <input 
            
            type ="text" 
              placeholder={lang[langKey].gptSearchPlaceholder}
              className='p-3 m-4 col-span-9 rounded-md bg-gray-700'/>
              <button className='col-span-3 bg-red-500 py-2 px-3 m-4 rounded-lg'>
                {lang[langKey].search}
              </button>
           
        </form>
    </div>
  )
}

export default GptSearchBar