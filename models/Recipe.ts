import mongoose, { Schema, models, model } from "mongoose";

// Previene redefiniciones en hot-reload
const RecipeSchema = new Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  ingredients: [{ type: String }],
  instructions: [{ type: String }],
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});

export default models.Recipe || model('Recipe', RecipeSchema);
