import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword ,signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    

    console.log(email.current.value);
    console.log(password.current.value)
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
              photoURL: "https://cdn.britannica.com/35/222735-050-E47C9CB6/American-entrepreneur-Reed-Hastings-2016.jpg"
            }).then(() => {
              const {uid, email, displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid :uid,
                email:email, 
                displayName:displayName,
                photoURL:photoURL}));


              navigate("/browse") 
            }).catch((error) => {
              console.log(error)
              setErrorMessage(error.message)
            });
            
            
            // ...

            
          })
          .catch((error) => {
            const errorCode = error?.code;
            const errorMessage = error?.message;
            setErrorMessage(errorCode + "-"+ errorMessage)
            navigate("/");
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
       console.log(user)
       navigate("/browse");
       // ...
     })
     .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       setErrorMessage(errorCode + "-"+ errorMessage)
       navigate("/");
     });

    }
    

  }
  return (
    <div>
       <Header/>
       <div className='absolute '>
            <img src='https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg'
              alt="background"/>
        </div>
        <form 
         onSubmit={(e)=>e.preventDefault()}
        className='absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-xl bg-opacity-80'>  
            <h3 className='text-2xl font-bold'>
              {isSignInForm ? "Sign In" : "Sign Up"}</h3>
            { !isSignInForm &&
            <input 
             ref = {name}
            type ="text" 
              placeholder='Enter ur Full Name' 
              className='p-3 my-4 w-full rounded-md bg-gray-700'/>}
            <input 
             ref = {email}
              type ="text" 
              placeholder='Enter ur Email Address' 
              className='p-3 my-4 w-full rounded-md bg-gray-700'/>
            <input 
              ref = {password} 
              type ="password" placeholder='Enter ur Passsword' className='p-3 my-4 w-full rounded-md bg-gray-700'/>
            <p className='font-bold text-red-700'>{errorMesssage}</p>
            <button className='bg-red-700 text-white p-4 my-6  w-full rounded-lg' onClick={handleButtonClick}>
                {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix ? Sign Up now" : "Already a User ? Sign In now"}</p>
        </form>
</div>
  )
}

export default Login