import React, { useState, useEffect } from 'react';

import useGetTasks from '../hooks/task/useGetTasks';
import useAddTask from '../hooks/task/useAddTask';
import useUpdateTask from '../hooks/task/useUpdateTask';
import useDeleteTask from '../hooks/task/useDeleteTask';

export default function Home() {
  const { tasks: initialTasks, isLoading: isLoadingTasks, error: errorGetAllTask } = useGetTasks();
  const { addTask, isLoading: isAdding, error: errorAddTask } = useAddTask();
  const { updateTask, isLoading: isUpdating, error: errorUpdateTask } = useUpdateTask();
  const { deleteTask, isLoading: isDeleting, error: errorDeleteTask } = useDeleteTask();

  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskQuantity, setNewTaskQuantity] = useState('');

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  if (isLoadingTasks || isDeleting || isAdding || isUpdating) return <div>Loading...</div>;

  if (errorGetAllTask) return <div>Error: {errorGetAllTask}</div>;
  if (errorAddTask) return <div>Error: {errorAddTask}</div>;
  if (errorUpdateTask) return <div>Error: {errorUpdateTask}</div>;
  if (errorDeleteTask) return <div>Error: {errorDeleteTask}</div>;

  const handleNameChange = (id, newName) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, nom: newName } : task);
    setTasks(updatedTasks);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedTasks = tasks.map(task => task.id === id ? { ...task, quantite: newQuantity } : task);
    setTasks(updatedTasks);
  };

  const handleAddClick = async (e) => {
    e.preventDefault();
    const result = await addTask({ nom: newTaskName, quantite: newTaskQuantity });
    if (result.response) {
      setTasks([...tasks, { id: result.taskId, nom: newTaskName, quantite: newTaskQuantity }]);
      setNewTaskName('');
      setNewTaskQuantity('');
    }
  };

  const handleModifyClick = async (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    const result = await updateTask(taskId, taskToUpdate);
    if (result.response) {
      setTasks(tasks.map(task => (task.id === taskId ? taskToUpdate : task)));
    }
  };

  const handleDeleteClick = async (taskId) => {
    const result = await deleteTask(taskId);
    if (result) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  return (
    <div className="relative overflow-x-auto m-12 border-2 rounded-lg">
      <form className='grid gap-6 md:grid-cols-3 m-4' onSubmit={handleAddClick}>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Nom"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          required
        />
        <input
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          placeholder="Quantité"
          value={newTaskQuantity}
          onChange={(e) => setNewTaskQuantity(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
        >
          Ajouter
        </button>
      </form>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Nom</th>
            <th scope="col" className="px-6 py-3">Quantité</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900">
                <input
                  className="w-full border-none outline-none"
                  type="text"
                  value={task.nom}
                  onChange={(e) => handleNameChange(task.id, e.target.value)}
                  name="nom"
                />
              </td>
              <td className="px-6 py-4">
                <input
                  className="w-full border-none outline-none"
                  type="number"
                  value={task.quantite}
                  onChange={(e) => handleQuantityChange(task.id, e.target.value)}
                  name="quantite"
                />
              </td>
              <td className="px-6 py-4">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                  onClick={() => handleModifyClick(task.id)}
                >
                  Modifier
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDeleteClick(task.id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
