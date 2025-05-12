import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:7070/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const markCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:7070/tasks/${id}`, { completed: true });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;
    try {
      await axios.delete("http://localhost:7070/tasks", {
        data: { ids: selectedIds },
      });
      setSelectedIds([]);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting tasks:", err);
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">📝 To-Do List</h2>
        <div>
          <button className="btn btn-success me-2" onClick={() => navigate("/addtask")}>
            + Add Task
          </button>
          <button
            className="btn btn-danger"
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
          >
            🗑️ Delete Selected
          </button>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="alert alert-info">No tasks found</div>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={selectedIds.includes(task.id)}
                  onChange={() => toggleSelect(task.id)}
                  id={`task-${task.id}`}
                />
                <label className="form-check-label" htmlFor={`task-${task.id}`}>
                  <strong>{task.title}</strong>: {task.description}{" "}
                  <span className={task.completed ? "text-success" : "text-danger"}>
                    ({task.completed ? "Completed" : "Pending"})
                  </span>
                </label>
              </div>
              {!task.completed && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => markCompleted(task.id)}
                >
                  ✅ Mark Completed
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
