import React from 'react'
import {MdOutlineDoneOutline} from 'react-icons/md'
import { ProgressBar } from 'react-loader-spinner';


const ListItem=({task,removeTask})=>{

    const formatDate = (date) => {
        const day =  date.getDate();
        const month =  date.getMonth() + 1;
        const year =  date.getFullYear();
        const hours =  date.getHours();
        const minutes =  date.getMinutes();
        const seconds =  date.getSeconds();
        return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
      };

      const currentDate = formatDate(task.currentDate);
    const dueDate = formatDate(task.dueDate);


    
    return(
        <div className='flex flex-row justify-between md:px-20 md:mx-5 items-center bg-slate-100 p-2 rounded-md my-2'>
        <div className='md:text-lg text-[#d044f7]'>
        <p>Title:{task.title}</p>
        <p>Description:{task.description}</p>
        <p>Added on:{currentDate}</p>
        <p className='text-red-600 text-sm'>Due on:
            {dueDate}
        </p>
        </div>
        <div>
            <MdOutlineDoneOutline size={30} className='cursor-pointer ' onClick={()=>removeTask(task.id)}/>
        </div>
        </div>
    )
}

function ListContainer({title,tasks,loading,removeTask}) {

    // console.log(loading)
    
  return (
    <div className='flex justify-center my-2'>
    <div className='flex flex-col bg-slate-300 w-[70vw] md:w-[50vw] p-3 rounded-lg min-h-50'>
        <h1 className='text-lg p-2 text-center font-bold text-[#d044f7]'>{title}</h1>
        {
            loading?
            <div className='flex justify-center items-center'>
            <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor = '#F4442E'
            barColor = '#51E5FF'
          />
          </div>
          :
          
            (tasks.length==0)?<h1 className='text-lg text-[#d044f7] text-center'>No {title} Tasks</h1>:
            tasks.map((task)=>{
                return(
                    <ListItem task={task} key={task.id} removeTask={removeTask}/>
                )
            }
            )
          }
            
        

    </div>
    </div>
  )
}

export default ListContainer