import React from 'react'
import { useAuth,useUser } from "@clerk/clerk-react";
import Navbar from './Navbar';
import Footer from './Footer';

function Todo() {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const {user}=useUser();
    if (!isLoaded || !userId) {
        return null;
      }
    
      return (
        <>
        <Navbar/>
        <h1 className='text-3xl'>
          Welcome back {user.firstName} {user.lastName} <br/> Complete the undone
        </h1>
        {/* <Footer /> */}
        </>
        
      );
}

export default Todo