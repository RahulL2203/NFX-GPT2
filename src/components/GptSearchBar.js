import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from "../utils/languageConstants"
import openai from "../utils/openai"
import { API_OPTIONS } from '../utils/constants'
import { addGptMovieResult } from '../utils/gptSlice'

const GptSearchBar = () => {

  const dispatch = useDispatch()
  const langKey = useSelector((store)=>store.config.lang);


  const searchMovieTMDB = async (movieName)=>{
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query="
       + movieName + 
       "&include_adult=false&language=en-US&page=1", 
    API_OPTIONS)

    const json = await data.json();
    return json.results;
}

  const searchText = useRef(null);
  const handleGPTSearchClick = async ()=>{
      
        //Make an API call to GPT API and get Movie Results
        const gptQuery = "Act as a Movie recommendation system and suggest some movies for the query given :" + searchText.current.value +
        "only give me names of 5 movies, comma seperated like the example result given ahead . Example result : Darling ,KGF ,KGF2 ,Bahubali ,Bahubali 2"

      const gptResults =  await openai.chat.completions.create({
                 messages: [{ role: 'user', content: gptQuery}],
             model: 'gpt-3.5-turbo',
          });
            if(!gptResults.choices){
              //Show error 
            }
          console.log(gptResults.choices[0].message.content)

          const gptMovies = gptResults.choices[0].message.content.split(",");//We will get an array of 5 movies
          const promiseArray = gptMovies.map ((movie)=>searchMovieTMDB(movie));
          //We get [promise, promise,promise,promise,promise]

          const tmdbResults = await Promise.all(promiseArray);
          console.log(tmdbResults);

          dispatch(addGptMovieResult({movieNames:gptMovies,movieResults:tmdbResults}));
  }

     

      

  return (
    <div className='pt-[50%] md:pt-[10%] flex justify-center'> 
        <form 
         onSubmit={(e)=>e.preventDefault()}
        className='absolute bg-black w-full md:w-1/2 grid grid-cols-12 text-white rounded-xl bg-opacity-80'>  
           
            <input 
            ref = {searchText}
            type ="text" 
              placeholder={lang[langKey].gptSearchPlaceholder}
              className='p-3 m-4 col-span-9 rounded-md bg-gray-700'/>
              <button className='col-span-3 bg-red-500 py-2 px-3 m-4 rounded-lg' 
                  onClick={handleGPTSearchClick}>
                {lang[langKey].search}
              </button>
           
        </form>
    </div>
  )
}

export default GptSearchBar