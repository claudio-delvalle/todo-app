import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    dueDate: Date,
    complete: Boolean,
  },
  { versionKey: false }
);

export const TodoBd = mongoose.model("TodoBd", todoSchema);
