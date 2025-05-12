import cors from 'cors';
import express from 'express'
import mysql from 'mysql2/promise'
//const mysql = require("mysql2/promise");
var userapp = express();
userapp.use(express.json());
userapp.use(express.urlencoded());
userapp.use(cors())
const db = {
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'todolist'
};
//get user and validate
//http://localhost:7070/tasks
userapp.get("/tasks", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
  
      const [rows] = await connection.execute('SELECT * FROM tasks');
  
      await connection.close();
  
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });
  
//save visitor
userapp.post("/tasks", async function (req, res) {
    try {
      const connection = await mysql.createConnection(db);
  
      const { title, description } = req.body;
  
      const [result] = await connection.execute(
        'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
        [title, description, false]  // completed is default false, but set explicitly
      );
  
      await connection.close();
  
      res.status(201).json({
        message: "Task inserted successfully",
        taskId: result.insertId
      });
  
    } catch (error) {
      console.error("Error inserting task:", error);
      res.status(500).json({ error: "Failed to insert task" });
    }
  });
  // PUT /tasks/:id
userapp.put("/tasks/:id", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const taskId = req.params.id;
      const { completed } = req.body;
  
      await connection.execute(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, taskId]
      );
  
      await connection.close();
      res.json({ message: "Task updated" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Failed to update task" });
    }
  });
  // DELETE /tasks (bulk delete)
userapp.delete("/tasks", async (req, res) => {
    try {
      const connection = await mysql.createConnection(db);
      const { ids } = req.body; // Expecting: { ids: [1, 2, 3] }
  
      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: "No task IDs provided" });
      }
  
      const placeholders = ids.map(() => "?").join(",");
      await connection.execute(`DELETE FROM tasks WHERE id IN (${placeholders})`, ids);
  
      await connection.close();
      res.json({ message: "Selected tasks deleted successfully" });
    } catch (error) {
      console.error("Error deleting tasks:", error);
      res.status(500).json({ error: "Failed to delete tasks" });
    }
  });
  
  

  
  

  

userapp.listen(7070)
console.log("Server started on port 7070")


