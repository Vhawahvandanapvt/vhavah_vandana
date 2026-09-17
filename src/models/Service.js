import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["puja-festival", "marriage-celebration"],
    },
    description: {
      type: String,
      required: true,
      maxlength: 3000,
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
    duration: {
      type: String,
      trim: true,
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
    inclusions: [{ type: String }],
    requirements: [{ type: String }],
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

ServiceSchema.index({ category: 1, isActive: 1 });
ServiceSchema.index({ featured: 1 });

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
