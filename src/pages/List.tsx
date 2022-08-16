import { nanoid } from 'nanoid';
import React, { ChangeEvent, FormEvent, useState } from 'react';

type ListProps = {};

type Task = {
  id: string;
  label: string;
  isComplete: boolean;
};

const List: React.FC<ListProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskLabel, setNewTaskLabel] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTaskLabel) {
      setTasks([...tasks, { id: nanoid(), label: newTaskLabel, isComplete: false }]);
      setNewTaskLabel('');
    }
  };

  const handleCompleteChange = (handledTask: Task) => (e: ChangeEvent<HTMLInputElement>) => {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id === handledTask.id) {
          return { ...handledTask, isComplete: e.target.checked };
        }
        return task;
      })
    );
  };

  const handleClearCompleted = () => {
    setTasks(tasks => tasks.filter(task => !task.isComplete));
  };

  const handleTaskDelete = (handledTask: Task) => {
    setTasks(tasks => tasks.filter(task => task.id !== handledTask.id));
  };

  return (
    <div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.isComplete}
              onChange={handleCompleteChange(task)}
            />
            {task.label}
            <button onClick={() => handleTaskDelete(task)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={newTaskLabel}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTaskLabel(e.target.value)}
        />
      </form>
      <button onClick={handleClearCompleted}>Clear completed</button>
    </div>
  );
};
export default List;
