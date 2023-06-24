import React, { useState,useRef,useEffect } from "react";
import {db} from '../firebase'
import { doc, setDoc,addDoc,collection } from "firebase/firestore/lite";
import {useUser } from "@clerk/clerk-react";

function Task({ addToTasks }) {

  const datetimeRef = useRef();
  const datetime='';

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
    currentDate: "",
    dueDate:datetime,
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = "23";
    const minutes = "55";
    const datetime = `${year}-${month}-${day}T${hours}:${minutes}`;
    datetimeRef.current.defaultValue = datetime;
  }, []);

  const {user}=useUser()

  // {console.log(datab)}

  let dueDate;
  const defaultDueDate = new Date();

  const { title, description, completed, date, dueDateTime } = newTask;

  const handleChange = (e, name) => {
    setNewTask({ ...newTask, [name]: e.target.value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const currentdate = new Date();
    // console.log(currentdate)

    const dueDateAndTime = new Date(dueDate);
    console.log(dueDateAndTime);

    const updatedDate = {
      ...newTask,
      currentDate: currentdate,
      dueDate:dueDateAndTime
    };
    // console.log(updatedDate);

    setNewTask(updatedDate);

    addToTasks((prev) => [...prev, updatedDate]);

    setNewTask({
      title: "",
      description: "",
      completed: false, 
      currentDate:"",
      dueDate:new Date()
    });

    try {

      await setDoc(doc(db, "users", user.id), {
        firstName: user.firstName,
        lastName: user.lastName,
      });
      
      const tasksRef = collection(db, "users", user.id, "tasks");
      await addDoc(tasksRef, updatedDate);

      // const docRef = await setDoc(doc(db, "tasks", `${currentdate}`), updatedDate);
      // console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log(error)
    }
    
  };


  return (
    <div className="flex justify-center">
    <div className="flex flex-col justify-center rounded-lg bg-[#d044f7] bg-opacity-50 w-[70vw] md:w-[50vw] ">
      <h1 className="flex justify-center text-xl text-white p-3 font-semibold">
        Add new Task
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center"
      >
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Add title"
          onChange={(e) => {
            handleChange(e, "title");
          }}
          required={true}
          className="p-2  w-2/3 bg-[#d044f7] placeholder-white text-white placeholder-center outline-none px-5 rounded-lg my-1 "
        />
        <textarea
          value={description}
          name="description"
          placeholder="Add description"
          onChange={(e) => {
            handleChange(e, "description");
          }}
          className="p-2  w-2/3 bg-[#d044f7] placeholder-white text-white placeholder-center outline-none px-5 rounded-lg my-1 h-40"
        />
        <label className="text-white flex w-2/3 justify-between items-center font-semibold md:text-lg text-sm">
          Due Date: <br/> <input
          id="datetime" ref={datetimeRef}
            type="datetime-local"
            value={dueDate}
            onChange={(e) => (dueDate = e.target.value)}
            className="p-2 w-28 md:w-3/4  bg-[#d044f7] placeholder-white text-white placeholder-center outline-none rounded-lg my-1 curson-pointer "
          />
        </label>
        {/* <div className="h-[1px] w-full bg-[#d044f7] mt-2" /> */}

        <input  type="submit" value="Add to List" className="text-white font-bold mt-2 w-full border-[1px] p-2 border-[#d044f7] hover:bg-[#d044f7] rounded-lg cursor-pointer transition-all duration-[300ms] ease-out hover:w-full" />
      </form>
    </div>
    </div>
  );
}

export default Task;
