import React,{useState} from "react";

function Task({addToTasks }) {
//   const { title, description, completed, date } = newTask;
const [newTask,setNewTask]=useState({
    title:"",
    description:"",
    completed:false,
    date:"",
  })

  const { title, description, completed, date } = newTask;


  const handleChange = (e, name) => {
    setNewTask({ ...newTask, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const currentDate = new Date();
    console.log(currentDate)
    e.preventDefault();

    const updatedDate={...newTask,date:currentDate}
    
    setNewTask(updatedDate);

    addToTasks((prev) => [...prev,updatedDate ]);

    setNewTask({
      title: "",
      description: "",
      completed: false,
      date:"", // set date to a new Date object for the next task
    });
  };
  return (
    <div className="">
      <h1>Add new Task</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            name="title"
            placeholder="Add title"
            onChange={(e) => {
              handleChange(e, "title");
            }}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            name="description"
            placeholder="Add description"
            onChange={(e) => {
              handleChange(e, "description");
            }}
          />
        </label>
        <input type="submit" value="Add Task" />
      </form>
      {/* {console.log(newTask)} */}
    </div>
  );
}

export default Task;