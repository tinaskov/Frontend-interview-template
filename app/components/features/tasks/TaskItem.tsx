import { GarbageCan } from "~/assets/GarbageCan";
import { memo, useState } from "react";
import { EditIcon } from "~/assets/EditIcon";
import { TaskForm } from "./TaskForm";
import type { Task, TaskFormData, UpdateTaskData } from "~/types";
import { Button } from "~/components/ui/Button/Button";

type Props = {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (data: UpdateTaskData) => Promise<boolean>;
};

export const TaskItem = memo(({ task, onToggle, onDelete, onUpdate }: Props) => {
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  if (!task) {
    console.error("TaskItem received undefined task");
    return <div>Error: Task data is missing</div>;
  }

  const handleUpdate = async (formData: TaskFormData) => {
    const updatedData: UpdateTaskData = { ...formData, id: task.id };
    const success = await onUpdate(updatedData);
    if (success) {
      setIsEditingTask(false);
    }
    return success;
  };

  const handleToggle = async () => {
    setIsUpdating(true);
    onToggle(task.id);
    setIsUpdating(false);
  };

  return (
    <div
      className='flex gap-6 py-5 px-3 border-t border-gray-200 hover:bg-gray-50 last-of-type:border-b'
      role='listitem'
      aria-label={`Task: ${task.title}`}>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={handleToggle}
        disabled={isUpdating}
        className='w-5 h-5 mt-1 accent-gray-500 border-2 border-gray-400 checked:bg-gray-500 checked:border-gray-500 '
        aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
      />

      {isEditingTask ? (
        <TaskForm onSubmit={handleUpdate} initialData={{ title: task.title, description: task.description }} />
      ) : (
        <div className='min-w-0 flex-1'>
          <h3 className={`text-md font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? "line-through text-gray-400" : "text-gray-500"}`}>
              {task.description}
            </p>
          )}
        </div>
      )}

      <div>
        <Button
          icon={<EditIcon />}
          onClick={() => setIsEditingTask(!isEditingTask)}
          className='text-gray-400 hover:text-blue-700 hover:bg-blue-50 transition-colors'
        />
        <Button
          variant='text'
          icon={<GarbageCan />}
          onClick={() => onDelete(task.id)}
          className='text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors'
        />
      </div>
    </div>
  );
});
