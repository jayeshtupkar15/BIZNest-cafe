import mongoose, { Schema } from "mongoose";

const MenuSchema = new Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String,
    calories: Number,
    ingredients: [String],
    allergens: [String],
    dietary: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Menu || mongoose.model("Menu", MenuSchema);
