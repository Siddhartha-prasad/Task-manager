const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {

        const task = await Task.create({
            title: req.body.title,
            user: req.user.id
        });

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {

        const tasks = await Task.find({ user: req.user.id });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTask=async (req, res) => {
    try{
        const task=await Task.findOneAndUpdate(
            {
            _id: req.params.id, user: req.user.id},
            req.body,
            {new: true}
        );

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }

        res.json(task);

    }catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteTask = async (req, res) => {
    try{
        const task= await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if(!task){
            return res.status(404).json({message: "Task not found"});
        }
        res.json({message: "Task deleted"});
    } catch(error){
        res.status(500).json({message: error.message});
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };