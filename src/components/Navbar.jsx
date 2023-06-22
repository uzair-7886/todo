import React from "react";
import todo from '../assets/tod.png'
import search from '../assets/search.png'

function Navbar() {
  return (
    <nav className=" w-full flex justify-between items-center h-16 bg-[#d044f7] bg-opacity-25 ">
      <div className="flex justify-start items-center p-3 md:mx-5 cursor-pointer">
        <img src={todo} alt="todo-icon" className="w-10" />
        <p className="text-lg sm:text-xl font-bold p-2 ">ToDo App</p>
      </div>
      <div className="flex p-3 md:mx-5">
        <div className="p-2">
            categories dropdown
        </div>
        <div className="flex justify-between items-center rounded-lg bg-[#d044f7] bg-opacity-50 ">
        <img src={search} alt=""  className="w-7 ml-2 cursor-pointer hover:scale-105"/>
        {/* <div className="w-0 ml-2 bg-black">.</div> */}
        <input type="text" placeholder="Search Task" className=" p-2 bg-transparent  placeholder-white text-white placeholder-center outline-none px-5 w-32 md:w-48 " />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
