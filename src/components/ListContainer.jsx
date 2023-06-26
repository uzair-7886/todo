import React from 'react'
import {MdOutlineDoneOutline} from 'react-icons/md'


const ListItem=({task})=>{

    const formatDate = (date) => {
        const formattedDate = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
        const day = formattedDate.getDate();
        const month = formattedDate.getMonth() + 1;
        const year = formattedDate.getFullYear();
        const hours = formattedDate.getHours();
        const minutes = formattedDate.getMinutes();
        const seconds = formattedDate.getSeconds();
        return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
      };

      const currentDate = formatDate(task.currentDate);
    const dueDate = formatDate(task.dueDate);


    const removeTask=(id)=>{
        alert(`task removed with title:${id}`)
      }
    return(
        <div className='flex flex-row justify-between md:px-20 md:mx-5 items-center bg-slate-100 p-2 rounded-md my-2'>
        <div className='md:text-lg text-[#d044f7]'>
        <p>Title:{task.title}</p>
        <p>Description:{task.description}</p>
        <p>Added on:{currentDate}</p>
        <p className='text-red-600'>Due on:
            {dueDate}
        </p>
        </div>
        <div>
            <MdOutlineDoneOutline size={30} className='cursor-pointer ' onClick={()=>removeTask(task.id)}/>
        </div>
        </div>
    )
}

function ListContainer({title,tasks}) {


    
  return (
    <div className='flex justify-center my-3'>
    <div className='flex flex-col bg-slate-300 w-[70vw] md:w-[50vw] p-3 rounded-lg'>
        <h1 className='text-lg p-2 text-center font-bold text-[#d044f7]'>{title}</h1>
        {
            tasks.map((task)=>{
                return(
                    <ListItem task={task} key={task.id}/>
                )
            })
        }

    </div>
    </div>
  )
}

export default ListContainer