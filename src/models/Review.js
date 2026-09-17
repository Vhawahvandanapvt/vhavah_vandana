import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    entityType: {
      type: String,
      enum: ["pandit", "ghat", "service"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "entityType",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerPhone: {
      type: String,
      trim: true,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      maxlength: 1000,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

ReviewSchema.index({ entityType: 1, entityId: 1 });
ReviewSchema.index({ isApproved: 1 });
ReviewSchema.index({ rating: -1 });

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
