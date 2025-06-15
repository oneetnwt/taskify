import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true
    },
    password: {
        type: String,
        minLength: 8,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

export default User