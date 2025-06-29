import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from "vitest";
import { setupServer } from "msw/node";
import { handlers, resetTasks } from "./handlers";
import type { Task } from "~/types";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetTasks();
});
afterAll(() => server.close());

describe("Task API handlers", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  describe("GET /api/tasks", () => {
    it("should return all tasks", async () => {
      const response = await fetch(`/api/tasks`);
      const tasks = await response.json();

      expect(response.status).toBe(200);
      expect(Array.isArray(tasks)).toBe(true);
      expect(tasks).toHaveLength(2);
      expect(tasks[0]).toMatchObject({
        id: "1",
        title: "Learn React",
        completed: false,
      });
    });
  });

  describe("POST /api/tasks", () => {
    it("should create a new task with title and description", async () => {
      const newTask = {
        title: "New Task",
        description: "Task description",
      };

      const response = await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const createdTask = await response.json();

      expect(response.status).toBe(201);
      expect(createdTask).toMatchObject({
        title: "New Task",
        description: "Task description",
        completed: false,
      });
      expect(createdTask.id).toBeDefined();
    });
  });

  describe("PUT /api/tasks/:id", () => {
    it("should update an existing task", async () => {
      const updates = {
        title: "Updated Title",
        description: "Updated description",
        completed: true,
      };

      const response = await fetch(`/api/tasks/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const updatedTask = await response.json();

      expect(response.status).toBe(200);
      expect(updatedTask).toMatchObject({
        id: "1",
        title: "Updated Title",
        description: "Updated description",
        completed: true,
      });
    });
  });

  describe("DELETE /api/tasks/:id", () => {
    it("should delete an existing task", async () => {
      const response = await fetch(`/api/tasks/1`, {
        method: "DELETE",
      });

      expect(response.status).toBe(204);

      const tasksResponse = await fetch(`/api/tasks`);
      const tasks = await tasksResponse.json();
      expect(tasks.find((task: Task) => task.id === "1")).toBeUndefined();
    });
  });

  describe("PATCH /api/tasks/:id/toggle", () => {
    beforeEach(async () => {
      await fetch(`/api/tasks/1`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false }),
      });

      await fetch(`/api/tasks/2`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: true }),
      });
    });

    it("should toggle task completion status from false to true", async () => {
      const response = await fetch(`/api/tasks/1/toggle`, {
        method: "PATCH",
      });

      const toggledTask = await response.json();

      expect(response.status).toBe(200);
      expect(toggledTask.id).toBe("1");
      expect(toggledTask.completed).toBe(true);
    });

    it("should toggle task completion status from true to false", async () => {
      const response = await fetch(`/api/tasks/2/toggle`, {
        method: "PATCH",
      });

      const toggledTask = await response.json();

      expect(response.status).toBe(200);
      expect(toggledTask.id).toBe("2");
      expect(toggledTask.completed).toBe(false);
    });
  });
});
