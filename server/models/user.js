const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, index: true, default: null },
    email: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
      trim: true,
      required: true,
    },
    password: { type: String, required: true },
    phone: { type: String, default: null },
    mobile: { type: String, required: true },
    zipCode: { type: String, required: true },
    profile: { type: String, default: null },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: false,
      },
    },
    accessToken: { type: String, index: true, default: null },
  },
  { timestamps: true, versionKey: false }
);

UserSchema.index({ "location.coordinates": "2dsphere" });

module.exports = mongoose.model("User", UserSchema);
