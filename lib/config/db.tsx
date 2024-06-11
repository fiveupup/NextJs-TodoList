import mongoose from "mongoose"

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://haiyasheji:T5jMzS5n0Ew3JAmw@my-mongo.dbb1rzk.mongodb.net/todo-app')

    console.log('DB Connected');
}