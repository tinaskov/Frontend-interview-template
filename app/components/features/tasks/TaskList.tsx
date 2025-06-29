import { memo, useMemo, useState } from "react";
import { useTasks } from "../../../hooks/useTasks";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { LoadingSpinner } from "~/assets/LoadingSpinner";
import { Button } from "~/components/ui/Button/Button";

export const TaskList = memo(() => {
  const { tasks, loading, error, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [showFormFields, setShowFormFields] = useState(false);

  const incompleteTasks = useMemo(() => tasks.filter(task => !task.completed), [tasks]);
  const completedTasks = useMemo(() => tasks.filter(task => task.completed), [tasks]);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className='text-red-500 p-4 border border-red-200 rounded bg-red-50'>
        <h3 className='font-semibold'>Error loading tasks</h3>
        <p>{error}</p>
        <Button onClick={() => window.location.reload()} label='Retry' variant='outlined' />
      </div>
    );

  return (
    <div className='h-full flex flex-col gap-32 pt-12 text'>
      <div className='flex flex-col gap-4'>
        <div className='text-2xl font-semibold'>
          To do{" "}
          {incompleteTasks.length > 0 && <span className='text-sm text-gray-500'>({incompleteTasks.length})</span>}
        </div>

        <div>
          {incompleteTasks.length === 0 ? (
            <p className='text-gray-500 italic py-4'>No tasks yet. Add one below!</p>
          ) : (
            incompleteTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
            ))
          )}
        </div>
        {showFormFields ? (
          <TaskForm
            onSubmit={async taskData => {
              const success = await addTask(taskData);
              if (success) {
                setShowFormFields(false);
              }
              return success;
            }}
          />
        ) : (
          <Button className='self-start' onClick={() => setShowFormFields(true)} label='Add Task' variant='contained' />
        )}
      </div>
      {completedTasks.length > 0 && (
        <div className='pt-12'>
          <div className='flex flex-col gap-6'>
            <div className='text-2xl font-semibold'>
              Completed tasks <span className='text-sm text-gray-500'>({completedTasks.length})</span>
            </div>
            {completedTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} onUpdate={updateTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
});
