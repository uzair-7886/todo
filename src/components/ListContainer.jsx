import React from 'react'


const ListItem=({task})=>{
    return(
        <div>
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>added on:{`${task.currentDate.getDate()}/${task.currentDate.getMonth()}/${task.currentDate.getYear()} at ${task.currentDate.getHours()}:${task.currentDate.getMinutes()}:${task.currentDate.getSeconds()}`}</p>
        </div>
    )
}

function ListContainer({title,tasks}) {
  return (
    <div>
        <h1>{title}</h1>
        {
            tasks.map((task)=>{
                return(
                    <ListItem task={task} key={task.id}/>
                )
            })
        }

    </div>
  )
}

export default ListContainer