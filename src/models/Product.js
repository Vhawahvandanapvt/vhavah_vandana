import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
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
    saleType: {
      type: String,
      enum: ["rent", "buy", "both"],
      default: "buy",
    },
    rentPrice: {
      type: Number,
      min: 0,
    },
    buyPrice: {
      type: Number,
      min: 0,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    isConsumable: {
      type: Boolean,
      default: false,
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

// If consumable, force saleType to "buy"
ProductSchema.pre("save", function () {
  if (this.isConsumable) {
    this.saleType = "buy";
  }
});

ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ saleType: 1 });
ProductSchema.index({ featured: 1 });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
