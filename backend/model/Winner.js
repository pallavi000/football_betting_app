const mongoose = require("mongoose");

const WinnerSchema = new mongoose.Schema(
  {
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
    user_card_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserCard",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reward: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const userPopulate = function (next) {
  this.populate("user_id");
  next();
};

WinnerSchema.pre("findOne", userPopulate).pre("find", userPopulate);

const Winner = mongoose.model("Winner", WinnerSchema);

module.exports = Winner;
