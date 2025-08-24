// models/MenuItem.ts
import mongoose, { Schema, model, models } from "mongoose";

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      enum: ["Coffee", "Cafe", "Burgers", "Desserts"], // ✅ consistent categories
      required: [true, "Category is required"],
    },
    image: {
      type: String,
      required: [true, "Image URL is required"], // ✅ now always `image`
    },
    calories: {
      type: Number,
      default: 0,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    allergens: {
      type: [String],
      default: [],
    },
    dietary: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);

export default MenuItem;
