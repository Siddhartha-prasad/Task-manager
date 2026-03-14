const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    const task = await Task.create({
        title: req.body.title,
        userId:req.user.id
    });

    res.json(task);
});
router.get("/", authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});
router.delete("/:id", authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});
router.put("/:id", authMiddleware, async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);

});

module.exports = router;