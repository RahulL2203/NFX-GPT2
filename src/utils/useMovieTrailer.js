import { useDispatch } from "react-redux";
import { addTrailerVideo } from "./movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "./constants";

const useMovietrailer = (movieId)=>{

    const dispatch = useDispatch();
  //Fetch movie trailer from API

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
    getMovieVideos()
  },[])

}

export default useMovietrailer;