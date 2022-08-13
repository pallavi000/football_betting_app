const mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

const UserCardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: { type: String, required: true },
    card_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Card",
    },
    price: { type: Number, default: 0 },
    reward: { type: Number, default: 0 },
    winner: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserCardSchema.virtual("matches", {
  foreignField: "user_card_id",
  localField: "_id",
  ref: "UserMatch",
});

const userPopulate = function (next) {
  this.populate("user_id");
  next();
};

UserCardSchema.pre("findOne", userPopulate).pre("find", userPopulate);

autoIncrement.initialize(mongoose.connection);
UserCardSchema.plugin(autoIncrement.plugin, {
  model: "UserCard",
  field: "id",
  startAt: 1,
});

const UserCard = mongoose.model("UserCard", UserCardSchema);

module.exports = UserCard;
