import { useState } from 'react';

const useAddTask = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addTask = async (taskDetails) => {
    setIsLoading(true);
    let result = false;

    try {
      const response = await fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskDetails),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred while adding the task');
      }
      result = { response: true, taskId: data.task.id };
    } catch (error) {
      setError(error.message);
      result = false;
    } finally {
      setIsLoading(false);
      return result;
    }
  };

  return { addTask, isLoading, error };
};

export default useAddTask;
