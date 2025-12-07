import { Request, Response } from "express";
import todoService from "../services/todoService";
import { CreateTodoInput, UpdateTodoInput } from "../types";

export class TodoController {
  // Get all todos
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  }

  // Get todo by ID
  async getTodoById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const todo = await todoService.getTodoById(id);
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch todo" });
    }
  }

  // Create new todo
  async createTodo(req: Request, res: Response) {
    try {
      const data: CreateTodoInput = req.body;

      if (!data.title || data.title.trim() === "") {
        return res.status(400).json({ error: "Title is required" });
      }

      const todo = await todoService.createTodo(data);
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ error: "Failed to create todo" });
    }
  }

  // Update todo
  async updateTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const data: UpdateTodoInput = req.body;
      const todo = await todoService.updateTodo(id, data);
      res.json(todo);
    } catch (error: any) {
      if (error.message === "Todo not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to update todo" });
    }
  }

  // Delete todo
  async deleteTodo(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      await todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === "Todo not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: "Failed to delete todo" });
    }
  }
}

export default new TodoController();
