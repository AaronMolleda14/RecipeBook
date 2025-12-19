// models/Admin.ts
import mongoose, { Schema, models, model } from "mongoose";

const AdminSchema = new Schema({
    user: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export default models.Admin || mongoose.model("Admin", AdminSchema);
