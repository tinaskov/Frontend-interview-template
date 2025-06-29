import { http, HttpResponse } from "msw";

export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

// In-memory store for tasks
let initialTasks: Task[] = [
  {
    id: "1",
    title: "Learn React",
    description: "Study React hooks and modern patterns",
    completed: false,
  },
  {
    id: "2",
    title: "Build Task App",
    description: "Create a simple task application with TypeScript",
    completed: true,
  },
];

let tasks: Task[] = [...initialTasks];

const findTask = (id: string) => tasks.find(task => task.id === id);

export const resetTasks = () => {
  tasks = [...initialTasks];
};

export const handlers = [
  // GET /api/tasks
  http.get("/api/tasks", () => HttpResponse.json(tasks)),

  // POST /api/tasks
  http.post("/api/tasks", async ({ request }) => {
    const { title, description } = (await request.json()) as { title: string; description?: string };

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description: description || "",
      completed: false,
    };

    tasks.push(newTask);
    return HttpResponse.json(newTask, { status: 201 });
  }),

  // PUT /api/tasks/:id
  http.put("/api/tasks/:id", async ({ params, request }) => {
    const task = findTask(params.id as string);
    if (!task) {
      return HttpResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updates = (await request.json()) as Partial<Task>;
    Object.assign(task, updates);

    return HttpResponse.json(task);
  }),

  // DELETE /api/tasks/:id
  http.delete("/api/tasks/:id", ({ params }) => {
    const index = tasks.findIndex(task => task.id === params.id);
    if (index === -1) {
      return HttpResponse.json({ error: "Task not found" }, { status: 404 });
    }

    tasks.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /api/tasks/:id/toggle
  http.patch("/api/tasks/:id/toggle", ({ params }) => {
    const task = findTask(params.id as string);
    if (!task) {
      return HttpResponse.json({ error: "Task not found" }, { status: 404 });
    }

    task.completed = !task.completed;
    return HttpResponse.json(task);
  }),
];
