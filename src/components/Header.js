import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO, USER_AVATAR } from '../utils/constants';

const Header = () => {

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const user = useSelector(store => store.user)

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
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className='absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-48'
        src = {LOGO }
        alt = "logo"/>
        {user && <div className='flex items-center '>
          <img className='w-10 h-10 rounded-xl'
          src={USER_AVATAR}
          alt = "user-icon"/>
          <button className='bg-red-500 p-2 m-2 rounded-lg text-white font-bold'
          onClick={handleSignOut}>
            Sign Out</button>
        </div>}
    </div>
  )
}

export default Header