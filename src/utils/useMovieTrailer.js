import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "./movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "./constants";
import { useSearchParams } from "react-router-dom";

const useMovietrailer = (movieId)=>{

    const dispatch = useDispatch();
  //Fetch movie trailer from API

  const trailerVideo = useSelector(store=>store.movies.trailerVideo)
  const getMovieVideos = async()=>{
    const data = await fetch("https://api.themoviedb.org/3/movie/"
    + movieId+
    "/videos?language=en-US", API_OPTIONS)
    const json = await data?.json();
    const filterdTrailers= json.results.filter((video)=>video.type=="Trailer");
   
    const trailer = filterdTrailers.length ? filterdTrailers[0]: json.results[0];
   
    dispatch(addTrailerVideo(trailer)) 
  } 

  useEffect(()=>{
    !trailerVideo &&  getMovieVideos()
  },[])

}

export default useMovietrailer;