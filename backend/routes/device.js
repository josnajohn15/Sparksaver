import express from "express";
import Device from "../models/Device.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Save user's devices
router.post("/save", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const devices = req.body.devices;

    const saved = await Device.insertMany(
      devices.map(d => ({ ...d, userId: decoded.id }))
    );

    res.json({ message: "Devices saved", data: saved });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token or save error" });
  }
});

export default router;
