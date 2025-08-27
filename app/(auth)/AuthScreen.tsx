
import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login';

 
const AuthScreen = () => {

  const [signup , setSignup] = useState(true);
  return (
    

    signup ? <Signup/> : <Login/>


  )
}

export default AuthScreen