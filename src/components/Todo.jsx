import React,{useState} from 'react'
import { useAuth,useUser } from "@clerk/clerk-react";
import Navbar from './Navbar';
import Footer from './Footer';
import Task from './Task';
import hi from '../assets/hi.png'

function Todo() {
  const [tasks,setTasks]=useState([])
 

    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const {user}=useUser();
    if (!isLoaded || !userId) {
        return null;
      }
    
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

        {tasks.map((task)=>{
          return(
            <div className='p-3 flex justify-center items-center'>
            <div className='w-96 h-32 bg-gray-200 rounded-md p-3'>
            <h1 className='text-xl font-medium'>{task.title}</h1>
            <p className='text-sm'>{task.description}</p>
            <p className='text-sm'>added on:{`${task.currentDate.getDate()}/${task.currentDate.getMonth()}/${task.currentDate.getYear()} at ${task.currentDate.getHours()}:${task.currentDate.getMinutes()}:${task.currentDate.getSeconds()}`}</p>
            {/* {console.log(task.currentDate.getcurrentDate())} */}
            </div>
            </div>
          )
        })}

        {/* <Footer /> */}
        </>
        
      );
}

export default Todo