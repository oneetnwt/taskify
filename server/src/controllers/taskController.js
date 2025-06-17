import Task from "../models/task.js"

export const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body

        if (!title) return res.status(400).json({ message: "Title field is required" })

        const newTask = new Task({ title, description, dueDate })

        await newTask.save()
        res.status(200).json({ message: "Task added successfully", newTask })
    } catch (error) {
        console.log(`Error in createTask controller: ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find()

        if (!tasks || tasks.length === 0) return res.status(400).json({ message: "No tasks", data: [] })

        res.status(200).json({ message: "Tasks successfully retrieved", data: tasks })
    } catch (error) {
        console.log(`Error in getTasks controller: ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, dueDate } = req.body

        if (!id) return res.status(400).json({ message: "ID is not found" })

        const task = await Task.findOne({ _id: new mongoose.Types.ObjectId(id) })

        if (!task) return res.status(400).json({ message: "Task not found" })

        const updatedTask = await Task.findOneAndUpdate({
            title: title ?? task.title,
            description: description ?? task.description,
            dueDate: dueDate ?? task.dueDate
        })

        await updatedTask.save()
        res.status(200).json({ message: "Successfully updated task", updatedTask })
    } catch (error) {
        console.log(`Error in updateTask controller: ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ message: "ID is not found" });

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(400).json({ message: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(`Error in delete controller: ${error}`)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}