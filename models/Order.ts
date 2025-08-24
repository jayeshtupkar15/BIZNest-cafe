import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  status: { 
    type: String, 
    enum: ["pending", "preparing", "completed"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Consistent pattern
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
