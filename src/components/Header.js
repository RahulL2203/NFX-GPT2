import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from '../utils/constants';
import { toggleGPTSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const showGPTSearch = useSelector(store => store.gpt.showGPTSearch)

  useEffect(()=>{

    const unSubscribe = onAuthStateChanged( auth, (user) => {
      if (user) {
        const {uid, email, displayName,photoURL} = user;
        dispatch(addUser({
            uid :uid,
            email:email, 
            displayName:displayName,
            photoURL:photoURL}));

            navigate("/browse");

      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    //UnSubscribed when component Unmounts
    return ()=> unSubscribe();
  },[])

  const handleLanguageChange = (e)=>{
      dispatch(changeLanguage(e.target.value))
  }
  const handleGPTSearchClick = ()=>{
    //Toggle GPT Search

    dispatch(toggleGPTSearchView());
  }

  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className='w-screen absolute px-8 py-2  bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img className='w-48 mx-auto md:mx-0'
        src = {LOGO }
        alt = "logo"/>
        {user && (
        <div className='flex md:items-center justify-between'>

          { showGPTSearch && 
            
            (<select className='bg-gray-800 text-white p-2 m-2 rounded-lg' onChange={handleLanguageChange}>
                 {SUPPORTED_LANGUAGES.map((lang)=><option key = {lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)}
        <button className='bg-blue-500 p-2 m-2 rounded-lg text-white opacity-50 hover:opacity-100'
            onClick={handleGPTSearchClick} >
               {showGPTSearch? "Homepage": "GPT Search"}
        </button>
          <img className='w-10 h-10 hidden md:inline-block rounded-xl bg-white opacity-50 hover:opacity-100'
              src={USER_AVATAR}
              alt = "user-icon"/>
          <button className='bg-red-500 p-2 m-2 rounded-lg text-white opacity-50 hover:opacity-100'
            onClick={handleSignOut}>
             Sign Out
          </button>
        </div>)}
    </div>
  )
}

export default Header