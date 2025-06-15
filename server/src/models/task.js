import mongoose from 'mongoose'

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date
    },
    isFinished: {
        type: Boolean,
        default: false
    }
},
    { timestamp: true }
)