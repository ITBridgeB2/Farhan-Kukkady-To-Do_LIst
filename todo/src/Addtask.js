import { useState } from "react";
import userdetailService from "./userdetailService";
import { useNavigate } from "react-router-dom";

export default function Addtask() {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission
    userdetailService.saveUserDetails(formData).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">Add Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter task title"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              placeholder="Enter description"
              rows="3"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
