import { useState } from 'react'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
  SignIn,
  SignUp
} from "@clerk/clerk-react";
// import dotenv from 'dotenv';
import Todo from './components/Todo';
import './App.css'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"


const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Publishable Key")
}

const ClerkProviderWithRoutes=()=>{
  const navigate = useNavigate();
  return(
<ClerkProvider
     publishableKey={clerkPubKey}
     navigate={(to) => navigate(to)}
     >
      <Routes>
      <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
         <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
        path='/'
        element={
          <>
          <SignedIn>
        <Todo/>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
          </>
        }
        />
      </Routes>
    </ClerkProvider>
  )
}


function App() {
  
  return (
    <BrowserRouter>
    <ClerkProviderWithRoutes/>
    {/* <p>hello test</p> */}
    </BrowserRouter>
  );
}

export default App
