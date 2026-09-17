import mongoose from "mongoose";

const GhatSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true, trim: true },
      hi: { type: String, trim: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    shortDescription: {
      type: String,
      maxlength: 200,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    location: {
      address: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },
    capacity: {
      type: Number,
      default: 100,
    },
    facilities: [{ type: String }],
    suitableFor: [{ type: String }],
    price: {
      type: Number,
      required: true,
      min: 0,
    },
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

GhatSchema.index({ isActive: 1, featured: 1 });
GhatSchema.index({ price: 1 });

export default mongoose.models.Ghat || mongoose.model("Ghat", GhatSchema);
