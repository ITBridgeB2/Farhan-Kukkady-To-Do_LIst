import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TaskList2(){
    const fetchTask=async ()=>{
        const res= await axios.get("http://localhost:7070/tasks")
        setFormTasks(res.data)

    }
    
    useEffect(()=>{
        fetchTask();
    })
    const markCompleted= async(id) =>{
        await axios.put(`http://localhost:7070/tasks/${id}`,{completed:true})
        fetchTask()


    }
    const navigate=useNavigate()
    const [tasks,setFormTasks]=useState([])
    return(
        <div>
            <button onClick={()=>navigate("/addtask")}>Add task</button>
            <h2>To-Do Lists</h2>
            <ul>
                {tasks.map((task)=>(
                    <li key={task.id}><strong>{task.title}</strong>
                    -
                    <strong>{task.description}
                    -
                    {""}{task.completed ? "Completed":"Pending"}</strong>
                    {!task.completed&& (<button onClick={()=>markCompleted(task.id)}> Mark completed</button>)}
                    </li>
                ))}
            </ul>

        </div>
    )
}