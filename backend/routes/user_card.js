const { Router } = require("express");
const router = Router();
const UserCard = require("../model/UserCard");
const Authorization = require("../middleware/auth");
const UserMatch = require("../model/UserMatch");
const Card = require("../model/Card");
const User = require("../model/User");
const Team = require("../model/Team");

// Get all user_cards
router.get("/", Authorization, async (req, res) => {
  try {
    const user_cards = await UserCard.find();
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// user active card
router.get("/active/get", Authorization, async (req, res) => {
  try {
    const user_cards = await UserCard.find({
      status: "active",
      user_id: req.user._id,
    })
      .populate("matches")
      .sort("-_id");
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// user archived card
router.get("/archived/get", Authorization, async (req, res) => {
  try {
    const user_cards = await UserCard.find({
      status: "archived",
      user_id: req.user._id,
    })
      .populate("matches")
      .sort("-_id");
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/archived/get/limit/:limit", Authorization, async (req, res) => {
  try {
    let limit = Number(req.params.limit);
    if (!Number.isInteger(limit)) {
      limit = 3;
    }
    const user_cards = await UserCard.find({
      status: "archived",
      user_id: req.user._id,
    })
      .populate("matches")
      .sort("-_id")
      .limit(limit);
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// user winner card
router.get("/winner/get", Authorization, async (req, res) => {
  try {
    const user_cards = await UserCard.find({
      status: "winner",
      user_id: req.user._id,
    })
      .populate("matches")
      .sort("-_id");
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// user winner card
router.get("/winner/get/limit/:limit", Authorization, async (req, res) => {
  try {
    let limit = Number(req.params.limit);
    if (!Number.isInteger(limit)) {
      limit = 3;
    }
    const user_cards = await UserCard.find({
      status: "winner",
      user_id: req.user._id,
    })
      .populate("matches")
      .sort("-_id")
      .limit(limit);
    res.send(user_cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create a new user_card
router.post("/", Authorization, async (req, res) => {
  try {
    let user = await User.findById(req.user._id);
    let card = await Card.findById(req.body.card_id);
    if (user.balance >= card.balance) {
      let user_card = new UserCard({
        user_id: req.user._id,
        card_id: req.body.card_id,
        status: "active",
        price: card.balance,
        reward: card.reward,
      });
      user_card = await user_card.save();

      for (const result of req.body.results) {
        let user_match = new UserMatch({
          match_id: result._id,
          result: result.result,
          user_id: req.user._id,
          user_card_id: user_card._id,
          card_id: req.body.card_id,
          home_team: result.home_team,
          away_team: result.away_team,
          home_team_image: result.home_team_image,
          away_team_image: result.away_team_image,
          home_team_nickname: result.home_team_nickname,
          away_team_nickname: result.away_team_nickname,
        });
        await user_match.save();
      }
      user.balance = user.balance - card.balance;
      await user.save();
      res.send({ user, user_card });
    } else {
      res.status(400).send("Insufficient Balance");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get user_card By ID
router.get("/:id", Authorization, async (req, res) => {
  try {
    const user_card = await UserCard.findById(req.params.id).populate([
      "matches",
      "card_id",
    ]);
    res.send(user_card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// card of the week

router.get("/card/week", Authorization, async (req, res) => {
  try {
    const card = await Card.findOne({ status: "active" })
      .sort("-_id")
      .populate("matches");
    res.send(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// card of the week by id

router.get("/card/week/:id", Authorization, async (req, res) => {
  try {
    const card = await Card.findOne({ status: "active", _id: req.params.id })
      .sort("-_id")
      .populate("matches");
    res.send(card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete user_card By ID
router.delete("/:id", Authorization, async (req, res) => {
  try {
    const user_card = await UserCard.findByIdAndDelete(req.params.id);
    res.send(user_card);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
