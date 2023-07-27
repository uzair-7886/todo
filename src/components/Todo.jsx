import React, { useEffect, useState,useLayoutEffect } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Task from './Task';
import hi from '../assets/hi.png';
import ListContainer from './ListContainer';
import { getFirestore, doc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { collection } from 'firebase/firestore/lite';
import Notification from './Notification';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [viewTasks, setViewTasks] = useState('Today');
  const [notification,setNotification]=useState({
    mode:undefined,
    text:''
  })


useLayoutEffect(() => {
  const timer = setTimeout(() => {

    setNotification({
      ...notification,
      mode: 'hide'
    });
  }, 1500); // Keep mounted for 1s

  return () => clearTimeout(timer);
}, [notification]);

  const { isLoaded, userId, getToken } = useAuth();
  const { user } = useUser();

  if (!isLoaded || !userId) {
    return null;
  }

  useEffect(() => {
    const getData = async () => {
      const tasksRef = collection(db, 'users', user.id, 'tasks');
      const allTasks = await getDocs(tasksRef);
      const tempTasks = [];
      allTasks.forEach((doc) => {
        tempTasks.push({
          ...doc.data(),
          id: doc.id,
          currentDate: new Date(doc.data().currentDate.seconds * 1000 + doc.data().currentDate.nanoseconds / 1000000),
          dueDate: new Date(doc.data().dueDate.seconds * 1000 + doc.data().dueDate.nanoseconds / 1000000)
        });
      });
      setTasks(tempTasks);
      setOriginalTasks(tempTasks);
      setLoadingList(false);
    };

    getData();
  }, []);

  useEffect(() => {
    if (viewTasks == 'Today') {
      const todayTasks = originalTasks.filter((task) => task.dueDate.getDate() == new Date().getDate() && task.dueDate.getMonth() == new Date().getMonth() && task.dueDate.getFullYear() == new Date().getFullYear());
      setTasks(todayTasks);
    } else if (viewTasks == 'Pending') {
      const pendingTasks = originalTasks.filter((task) => task.dueDate.getDate() < new Date().getDate() && task.dueDate.getMonth() <= new Date().getMonth() && task.dueDate.getFullYear() <= new Date().getFullYear());
      setTasks(pendingTasks);
    } else if (viewTasks == 'Upcoming') {
      const upcomingTasks = originalTasks.filter((task) => task.dueDate.getDate() > new Date().getDate() || task.dueDate.getMonth() > new Date().getMonth() || task.dueDate.getFullYear() > new Date().getFullYear());
      setTasks(upcomingTasks);
    }
  }, [viewTasks, originalTasks]);

  const removeTask = async(id) => {

    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    setOriginalTasks(newTasks)
    await deleteDoc(doc(db, 'users', user.id, 'tasks', id));
    setNotification({
      mode:'show',
      text:'Task Removed'
    })
    // window.location.reload()
    // alert("task removed successfully")
  };

  return (
    <div>
      <Navbar />
       <Notification text={notification.text} show={notification.mode}/>
      <div className='p-3 flex justify-center items-center'>
        <img src={hi} alt='' className='w-10 md:w-12' />
        <h1 className='p-2 text-lg md:text-2xl text-center font-medium'>
          Welcome back {user.firstName} {user.lastName}
        </h1>
      </div>
      <Task addToTasks={setOriginalTasks} originalTasks={originalTasks} setNotification={setNotification}  />

      <div className='flex rounded-md shadow-sm justify-center p-3' role='group'>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-slate-300 border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-[#d044f7] focus:z-10 focus:ring-2 focus:ring-[#d044f7] focus:text-[#d044f7]'
          onClick={() => setViewTasks('Today')}
        >
          Today
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium  bg-slate-300 text-gray-900 border-t border-b border-gray-200 hover:bg-gray-100 hover:text-[#d044f7] focus:z-10 focus:ring-2 focus:ring-[#d044f7] focus:text-[#d044f7]'
          onClick={() => setViewTasks('Pending')}
        >
          Pending
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-slate-300 border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-[#d044f7]focus:z-10 focus:ring-2 focus:ring-[#d044f7] focus:text-[#d044f7]'
          onClick={() => setViewTasks('Upcoming')}
        >
          Upcoming
        </button>
      </div>

      <ListContainer title={viewTasks} tasks={tasks} loading={loadingList} removeTask={removeTask} setNotification={setNotification} />
      {/* <Footer /> */}
    </div>
  );
}

export default Todo;