import mongoose, { Schema, Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  designation?: string;
}

const StaffSchema = new Schema<IStaff>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "staff" },
  designation: { type: String, default: "barista" },
});

export default mongoose.models.Staff || mongoose.model<IStaff>("Staff", StaffSchema, "staff");
