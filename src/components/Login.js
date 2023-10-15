import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { BACKGROUND_IMG, USER_AVATAR } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatch = useDispatch();
 
  const [isSignInForm,setIsSignInForm] = useState(true);

  const [errorMesssage, setErrorMessage] = useState(null)

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const toggleSignInForm = ()=>{
      setIsSignInForm(!isSignInForm);
  }

  const handleButtonClick = ()=>{
    //Validate the Form Data 
    

   
    const message = checkValidData(email?.current?.value,password?.current?.value);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm){
        //SignUp Logic here
        createUserWithEmailAndPassword(
          auth, 
          email?.current?.value,
          password?.current?.value)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            updateProfile(user, {
              displayName: name.current.value, 
              photoURL: USER_AVATAR
            }).then(() => {
              const {uid, email, displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid :uid,
                email:email, 
                displayName:displayName,
                photoURL:photoURL}));


            }).catch((error) => {
              setErrorMessage(error.message)
            });
            
            
            // ...

            
          })
          .catch((error) => {
            const errorCode = error?.code;
            const errorMessage = error?.message;
            setErrorMessage(errorCode + "-"+ errorMessage)
           
            // ..
          });

    }
    else
    {
     //SignIn Logic here
     signInWithEmailAndPassword(auth,email?.current?.value,password?.current?.value)
     .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
    
       // ...
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrorMessage(errorCode + "-"+ errorMessage)
   
     });

    }
    

  }
  return (
    <div>
       <Header/>
       <div className='absolute '>
            <img className="object-cover h-screen md:h-fit" src={BACKGROUND_IMG}
            alt ="background"/>
        </div>
        <form 
         onSubmit={(e)=>e.preventDefault()}
        className='absolute p-12 bg-black md:w-3/12 w-full my-36 mx-auto right-0 left-0 text-white rounded-xl bg-opacity-80'>  

                         
            <h3 className='md:text-2xl text-lg font-bold'>
              {isSignInForm ? "Sign In" : "Sign Up"}</h3>
            { !isSignInForm &&
            <input 
             ref = {name}
            type ="text" 
              placeholder='Enter ur Full Name' 
              className='md:p-3 p-2 md:my-4 my-3 w-full rounded-md bg-gray-700'/>}
            <input 
             ref = {email}
              type ="text" 
              placeholder='Enter ur Email Address' 
              className='md:p-3 p-2 md:my-4 my-3 w-full rounded-md bg-gray-700'/>
            <input 
              ref = {password} 
              type ="password" placeholder='Enter ur Passsword' className='md:p-3 p-2 my-4 w-full rounded-md bg-gray-700'/>
            <p className='font-bold text-red-700'>{errorMesssage}</p>
            <button className='bg-red-700 text-white md:p-4 p-3 md:my-6 my-4 w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up now" : "Already a User ? Sign In now"}</p>
        </form>
</div>
  )
}

export default Login