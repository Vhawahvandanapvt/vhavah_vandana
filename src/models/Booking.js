import mongoose from "mongoose";
import { generateBookingId } from "@/lib/utils";

const BookingProductSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product",
    set: (v) => v === "" ? null : v
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  purchaseType: { type: String, enum: ["rent", "buy"], default: "buy" },
  price: { type: Number, required: true, min: 0 },
});

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    bookingType: {
      type: String,
      required: true,
      enum: ["ghat", "puja", "marriage", "pandit", "samagri", "custom"],
    },
    ghatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ghat",
      set: (v) => v === "" ? null : v,
    },
    ghatName: { type: String },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      set: (v) => v === "" ? null : v,
    },
    serviceName: { type: String },
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pandit",
      set: (v) => v === "" ? null : v,
    },
    panditName: { type: String },
    products: [BookingProductSchema],
    date: {
      type: String,
      trim: true,
    },
    time: {
      type: String,
      trim: true,
    },
    guests: {
      type: Number,
      min: 1,
    },
    venue: {
      type: String,
      trim: true,
    },
    specialRequirements: {
      type: String,
      maxlength: 1000,
    },
    estimatedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: [
        "New",
        "WhatsApp Contacted",
        "Payment Pending",
        "Confirmed",
        "Completed",
        "Cancelled",
      ],
      default: "New",
    },
    whatsappSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate bookingId before saving
BookingSchema.pre("validate", function () {
  if (!this.bookingId) {
    this.bookingId = generateBookingId();
  }
});

BookingSchema.index({ status: 1 });
BookingSchema.index({ bookingType: 1 });
BookingSchema.index({ createdAt: -1 });
BookingSchema.index({ phone: 1 });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
