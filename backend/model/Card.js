const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const CardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: { type: String, required: true },
    balance: { type: Number, default: 0 },
    reward: { type: Number, default: 0 },
    winners: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CardSchema.virtual("matches", {
  localField: "_id",
  foreignField: "card_id",
  ref: "Match",
});

CardSchema.virtual("userCards", {
  localField: "_id",
  foreignField: "card_id",
  ref: "UserCard",
  options: {
    sort: { _id: -1 },
  },
});

CardSchema.virtual("winnersUsers", {
  localField: "_id",
  foreignField: "card_id",
  ref: "Winner",
  options: {
    sort: { _id: -1 },
  },
});

autoIncrement.initialize(mongoose.connection);
CardSchema.plugin(autoIncrement.plugin, {
  model: "Card",
  field: "id",
  startAt: 1,
});

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;
