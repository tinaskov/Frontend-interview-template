import type { Task } from "../types";

const API_BASE = "/api/tasks";

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(API_BASE);
    if (!response.ok) throw new Error("Failed to fetch tasks");
    return response.json();
  },

  async createTask(taskData: { title: string; description?: string }): Promise<Task> {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) throw new Error("Failed to create task");
    return response.json();
  },

  async updateTask(taskData: { id: string; title: string; description?: string }): Promise<Task> {
    const response = await fetch(`${API_BASE}/${taskData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskData.title, description: taskData.description }),
    });
    if (!response.ok) throw new Error("Failed to update task");
    return response.json();
  },

  async toggleTask(taskId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${taskId}/toggle`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle task");
  },

  async deleteTask(taskId: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${taskId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete task");
  },
};
