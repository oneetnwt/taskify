import express from 'express'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/taskController.js'

const router = express.Router()

router.post('/create-task', createTask)
router.get('/get-tasks', getTasks)
router.put('/update-task/:id', updateTask)
router.delete('/delete-task/:id', deleteTask)

export default router