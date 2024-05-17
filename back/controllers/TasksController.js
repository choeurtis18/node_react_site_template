const Tasks = require('../models/Tasks');

const tasks = require('../datas/taks');

exports.add = (data) => {
  try {
    /*
    const task = new Tasks({
      ...data
    });
    await task.save();
    */

    const id = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id, ...data };
    tasks.push(newTask);
    return { status: 201, message: 'Task added in the memory', task: newTask };
  } catch (error) {
    console.error("An error occurred while adding task:", error);
    throw error;
  }
};

exports.getAll = () => {
  try {
    //    const tasks = await Task.find();
    return { status: 200, message: 'getTasks Ok!', tasks: tasks };
  } catch (error) {
    console.error("An error occurred while getting tasks", error);
    throw error;
  }
};

exports.getOne = (id) => {
  try {
    //    const task = await Task.findOne({ _id: id });
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
      throw new Error('Task not found');
    }
    return { status: 200, message: 'Get Task ' + id, task: task };
  } catch (error) {
    console.error("An error occurred while getting one task", error);
    throw error;
  }
};

exports.update = (id, taskData) => {
  try {
    //    await Task.updateOne({_id: id}, { ...taskData, _id: id });
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...taskData };
    return { status: 200, message: 'Task updated ' + id, task: tasks[taskIndex] };
  } catch (error) {
    console.error("An error occurred while updating task", error);
    throw error;
  }
};

exports.delete = (id) => {
  try {
    //    await Task.deleteOne({_id: id});
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    tasks.splice(taskIndex, 1);
    return { status: 200, message: 'Task deleted ' + id };
  } catch (error) {
    console.error("An error occurred while deleting task", error);
    throw error;
  }
};
