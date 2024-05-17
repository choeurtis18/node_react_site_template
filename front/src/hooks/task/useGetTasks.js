import { useState, useEffect } from 'react';

const useGetTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/task', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'An error occurred while fetching tasks');
        }

        setTasks(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, isLoading, error };
};

export default useGetTasks;
