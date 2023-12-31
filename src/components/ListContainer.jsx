import React from 'react'
import {MdOutlineDoneOutline} from 'react-icons/md'
import { ProgressBar } from 'react-loader-spinner';


const ListItem=({task,removeTask})=>{

    const formatDate = (date) => {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day =  date.getDate();
        const weekDay=daysOfWeek[date.getDay()];
        const month =  date.getMonth() + 1;
        const year =  date.getFullYear();
        const hours =  date.getHours();
        const twelveHours=hours%12
        const minutes =  date.getMinutes();
        const seconds =  date.getSeconds();
        const tm=(hours>12)?"pm":"am"
        // return `${weekDay} ${day}/${month}/${year} at ${twelveHours}:${minutes} ${tm}`;
        return {
          day:day,
          weekDay:weekDay,
          month:month,
          year:year,
          hours:twelveHours,
          minutes:minutes,
          seconds:seconds,
          tm:tm
        }
      };

      const currentDate = formatDate(task.currentDate);
    const {day,weekDay,month,year,hours,minutes,seconds,tm} = formatDate(task.dueDate);


    
    return(
        <div className='flex flex-row flex-grow-0 justify-between md:px-20 md:mx-5 items-center bg-slate-100 p-2 rounded-md my-2'>
          <div className='flex flex-col '>
          <div className='md:text-lg text-[#d044f7]'>
        <p className='md:text-xl font-semibold'>{task.title}</p>
        
        <p >{task.description}</p>
        </div>
     
    
        {/* <p>Added on:{currentDate}</p> */}
        <div className=' mt-1 md:mt-2 flex flex-col text-red-600 text-xs md:text-sm align-text-bottom'>
        <p className=''>Due: 
            {` ${weekDay} ${day}/${month}/${year}`}
        </p>
        <p>Time: {` ${hours}:${minutes} ${tm}`}</p>
        </div>
        
        </div>
        <div className='flex justify-between items-center'>
            <button className='bg-[#d044f7] md:py-1 md:px-3 text-xs py-1 md:text-sm px-2 rounded-md text-white mt-2 cursor-pointer hover:scale-110'>edit</button>
            <MdOutlineDoneOutline title='Mark as completed' color='green' size={30} className='cursor-pointer hover:scale-110 ml-5' onClick={()=>removeTask(task.id)}/>
        </div>
        </div>
    )
}

function ListContainer({title,tasks,loading,removeTask,setNotification}) {

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
            borderColor = '#000000'
            barColor = '#d044f7'
          />
          </div>
          :
          
            (tasks.length==0)?<h1 className='text-lg text-[#d044f7] text-center'>No {title} Tasks</h1>:
            tasks.map((task)=>{
                return(
                    <ListItem task={task} key={task.id} removeTask={removeTask} setNotification={setNotification}/>
                )
            }
            )
          }
            
        

    </div>
    </div>
  )
}

export default ListContainer