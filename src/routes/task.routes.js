const express = require('express');
const router = express.Router();

//Modelo de tareas
const Task = require('../models/task');

router.get('/', async(req, res) => {

    let tasks = await Task.find();
    return res.json({
        tasks
    });

    // Task.find()
    // .then(tasks => {
    //     res.json({
    //         status: true,
    //         tasks: tasks
    //     });
    // })
    // .catch(err => {
    //     return res.status(500).json({
    //         status: false,
    //         err
    //     });
    // });

});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    return res.json(task);
});

router.post('/', async(req, res) => {
    let {title, description} = req.body;
    let task = new Task({
        title,
        description
    });
    await task.save();
    return res.json({
        "status": "task saved"
    });
});

router.put('/:id', async(req, res) => {
    let {title, description} = req.body;
    let newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    return res.json({
        "status": "task updated"
    });
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    return res.json({
        "status": "task deleted"
    });
});

module.exports = router;