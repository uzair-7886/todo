import React from 'react'
import { useAuth,useUser } from "@clerk/clerk-react";

function Todo() {

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const {user}=useUser();
    if (!isLoaded || !userId) {
        return null;
      }
    
      return (
        <h1 className="text-3xl font-bold underline">
          Welcome back {user.firstName} {user.lastName} <br/> Complete the undone
        </h1>
      );
}

export default Todo