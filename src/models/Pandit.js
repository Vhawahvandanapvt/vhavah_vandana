import mongoose from "mongoose";

const PanditSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Pandit name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 2000,
    },
    shortBio: {
      type: String,
      maxlength: 200,
    },
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    languages: [{ type: String }],
    specializations: [{ type: String }],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceNote: {
      type: String,
      trim: true,
    },
    availability: {
      type: String,
      enum: ["available", "busy", "unavailable"],
      default: "available",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

PanditSchema.index({ isActive: 1, availability: 1 });
PanditSchema.index({ rating: -1 });
PanditSchema.index({ featured: 1 });

export default mongoose.models.Pandit || mongoose.model("Pandit", PanditSchema);
