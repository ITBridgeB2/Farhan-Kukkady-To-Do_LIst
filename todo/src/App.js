import {Route, Routes } from "react-router-dom";
import TaskList from "./TaskList";
import Addtask from "./Addtask";
import TaskList2 from "./TaskListClone";

export default function App(){
  return(
  <Routes>
    <Route path="/" element={<TaskList></TaskList>}></Route>
    <Route path="/clone" element={<TaskList2></TaskList2>}></Route>
    <Route path="/addtask" element={<Addtask></Addtask>}></Route>
  </Routes>
  )
  
}