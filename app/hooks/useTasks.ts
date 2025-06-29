import { useCallback, useEffect, useState } from "react";
import type { Task } from "../types";
import { taskService } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData: { title: string; description?: string }) => {
    if (!taskData.title.trim()) return false;
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks(prev => sortTasks([...prev, newTask]));
      return true;
    } catch (err) {
      setError("Failed to add task");
      await fetchTasks();
      return false;
    }
  };

  const updateTask = useCallback(
    async (taskData: { id: string; title: string; description?: string }) => {
      if (!taskData.title.trim()) return false;
      try {
        await taskService.updateTask(taskData);
        await fetchTasks();
        return true;
      } catch (err) {
        setError("Failed to update task");
        return false;
      }
    },
    [fetchTasks]
  );

  const toggleTask = useCallback(
    async (taskId: string) => {
      const previousTasks = tasks;
      const updatedTasks = tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task));
      try {
        await taskService.toggleTask(taskId);
        const sortedTasks = sortTasks(updatedTasks);
        setTasks(sortedTasks);
      } catch (err) {
        setTasks(previousTasks);
        setError("Failed to update task");
      }
    },
    [tasks]
  );

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  }, []);

  const sortTasks = (tasks: Task[]) => {
    return tasks.sort((taskA, taskB) => {
      if (taskA.completed && !taskB.completed) {
        return 1;
      } else if (!taskA.completed && taskB.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, error, addTask, toggleTask, deleteTask, updateTask };
};
