import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "In-Progress", "Ready"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);
export default Order;
