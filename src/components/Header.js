import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {

  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className='absolute px-8 py-2 w-screen bg-gradient-to-b from-black z-10 flex justify-between'>
        <img className='w-48'
        src = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt = "logo"/>
        {user && <div className='flex items-center '>
          <img className='w-10 h-10 rounded-xl'
          src={user?.photoURL}
          alt = "user-icon"/>
          <button className='bg-red-500 p-2 m-2 rounded-lg text-white font-bold'
          onClick={handleSignOut}>
            Sign Out</button>
        </div>}
    </div>
  )
}

export default Header