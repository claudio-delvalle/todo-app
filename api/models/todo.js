import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  id:String,
  title: String,
  description: String,
  dueDate: Date,
  complete: Boolean,
});

export const TodoBd = mongoose.model("TodoBd", todoSchema);


