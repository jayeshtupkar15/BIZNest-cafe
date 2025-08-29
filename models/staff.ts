import mongoose, { Schema, model, models } from "mongoose";

const StaffSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"], unique: true },
    phone: { type: String, required: [true, "Phone number is required"] },
    password: { type: String, required: [true, "Password is required"] },
    role: {
  type: String,
  enum: ["manager", "cashier", "chef", "waiter", "cleaner", "barista"],
  required: true,
},
    salary: { type: Number, default: 0 },
    shift: {
      type: String,
      enum: ["Morning", "Afternoon", "Evening", "Night"],
      default: "Morning",
    },
  },
  { timestamps: true }
);

const Staff = models.Staff || model("Staff", StaffSchema);
export default Staff;
