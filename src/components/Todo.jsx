import React,{useEffect, useState} from 'react'
import { useAuth,useUser } from "@clerk/clerk-react";
import Navbar from './Navbar';
import Footer from './Footer';
import Task from './Task';
import hi from '../assets/hi.png'
import ListContainer from './ListContainer';
import { getFirestore,doc,getDocs } from "firebase/firestore/lite";
import { db } from '../firebase';
import { collection } from 'firebase/firestore/lite';


function Todo() {
  const [tasks,setTasks]=useState([])
 

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const {user}=useUser();
    if (!isLoaded || !userId) {
        return null;
      }

    useEffect(()=>{
      const getData=async ()=>{
        const tasksRef=collection(db,"users",user.id,"tasks")
      const allTasks= await getDocs(tasksRef)
      const tempTasks=[]
      // console.log(allTasks)
      allTasks.forEach((doc)=>{
        // console.log(doc.data())
        // tempTasks.push(doc.data())
        tempTasks.push({...doc.data(),id:doc.id})
      })
      setTasks(tempTasks)
      }

getData()
    },[])

    
      return (
        <>
        <Navbar/>
        <div className='p-3 flex justify-center items-center'>
        <img src={hi} alt="" className='w-10 md:w-12'/>
        <h1 className='p-2 text-xl md:text-2xl text-center font-medium'>
          Welcome back {user.firstName} {user.lastName}
        </h1>
        </div>
        <Task addToTasks={setTasks}/>
        <ListContainer title='Today' tasks={tasks} />

       

        {/* <Footer /> */}
        </>
        
      );
}

export default Todo