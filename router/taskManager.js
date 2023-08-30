const express = require('express');
const taskController = require('../controller/taskManager');

const router = express.Router();


router.get('/',taskController.getallTaskController);

router.post('/',taskController.postTaskController);

router.post('/:id', taskController.updateTaskController);

router.delete('/:id', taskController.deleteTaskController);


module.exports = router;