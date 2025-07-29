const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isShared: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// performance optimization by indexing userId and isShared
noteSchema.index({ userId: 1 });
noteSchema.index({ isShared: 1 });


module.exports = mongoose.model("Note", noteSchema);
