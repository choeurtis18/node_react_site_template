import { useState, useEffect } from 'react';

const useGetTask = (taskId) => {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/task/${taskId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching task');
        }

        setTask(data.task);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  return { task, isLoading, error };
};

export default useGetTask;
