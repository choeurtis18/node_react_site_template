import React, { useState } from 'react';
import tasksData from "../data/taks";

export default function Home() {
    const [tasks, setTasks] = useState(tasksData);

    const handleNameChange = (index, newName) => {
        const newTasks = tasks.map((task, i) => i === index ? { ...task, nom: newName } : task);
        setTasks(newTasks);
    };

    const handleQuantityChange = (index, newQuantity) => {
        const newTasks = tasks.map((task, i) => i === index ? { ...task, quantité: newQuantity } : task);
        setTasks(newTasks);
    };

    const handleModifyClick = (index) => {
        console.log(`Task at index ${index} modified`);
    };

    const handleDeleteClick = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    return (
        <div className="relative overflow-x-auto m-12 border-2 rounded-lg">
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
                                    onChange={(e) => handleNameChange(index, e.target.value)} 
                                    name="nom" 
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input 
                                    className="w-full border-none outline-none" 
                                    type="number" 
                                    placeholder={task.quantite} 
                                    onChange={(e) => handleQuantityChange(index, e.target.value)} 
                                    name="quantite" 
                                />
                            </td>
                            <td className="px-6 py-4">
                                <button 
                                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700"
                                    onClick={() => handleModifyClick(index)}
                                >
                                    Modifier
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    onClick={() => handleDeleteClick(index)}
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
