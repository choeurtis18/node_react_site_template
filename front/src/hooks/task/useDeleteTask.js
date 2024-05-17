import { useState } from 'react';

const useDeleteTask = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const deleteTask = async (taskId) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/task/${taskId}`, {
        method: 'DELETE',
        headers: {},
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Could not delete the task.');
      }
      
      return true; 
    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteTask, isDeleting, error };
};

export default useDeleteTask;
