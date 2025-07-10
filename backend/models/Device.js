import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appliance: String,
  brand: String,
  hours: Number,
  wattage: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Device", deviceSchema);
