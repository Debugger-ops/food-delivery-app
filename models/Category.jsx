// models/Category.jsx
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
}, { timestamps: true });

const Category = models.Category || model('Category', CategorySchema);

export { Category };  // Named export
