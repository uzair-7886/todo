import React from 'react'


const ListItem=({task})=>{
    return(
        <div>
        <p>{task.title}</p>
        <p>{task.description}</p>
        <p>Added on:{`${task.currentDate.getDate()}/${task.currentDate.getMonth()+1}/${task.currentDate.getYear()} at ${task.currentDate.getHours()}:${task.currentDate.getMinutes()}:${task.currentDate.getSeconds()}`}</p>
        <p>Due on:
            {`${task.dueDate.getDate()}/${task.dueDate.getMonth()}/${task.dueDate.getYear()} at ${task.dueDate.getHours()}:${task.dueDate.getMinutes()}:${task.dueDate.getSeconds()}`}
        </p>
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