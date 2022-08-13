const { Router } = require("express");
const router = Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Authorization = require("../middleware/auth");
const AdminAuth = require("../middleware/adminAuth");
const Transaction = require("../model/Transaction");
const ApiError = require("../middleware/ApiError");

// Get all users
router.get("/", AdminAuth, async (req, res) => {
  try {
    const users = await User.find().sort("-_id");
    res.send(users);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Create a new user
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
    });
    user = await user.save();
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Create a new user
router.post("/register/admin", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashPassword,
      role: "admin",
    });
    user = await user.save();
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (valid) {
        var token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.SECRET_KEY
        );
        res.json({ token: token, user: user });
      } else {
        ApiError(res, 400, "Login failed! Invalid Password");
      }
    } else {
      ApiError(res, 404, "User not found");
    }
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Get user By ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

router.get("/current/user", Authorization, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

router.post("/change/password/", Authorization, async (req, res) => {
  try {
    if (req.body.newpassword == req.body.confirmpassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newpassword, salt);

      const user = await User.findById(req.user._id);
      user.password = hashPassword;
      await user.save();
      res.send(user);
    } else {
      ApiError(res, 400, "Password did not match");
    }
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Update User
router.put("/:id", Authorization, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
      },
      { new: true }
    );
    console.log(req.body, user);
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Update User By Admin
router.put("/update/by-admin/:id", AdminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
      },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Update User Password By Admin
router.put("/update/password/by-admin/:id", AdminAuth, async (req, res) => {
  try {
    if (req.body.newpassword == req.body.confirmpassword) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.newpassword, salt);
      const user = await User.findById(req.params.id);
      user.password = hashPassword;
      await user.save();
      res.send(user);
    } else {
      ApiError(res, 400, "Password did not match");
    }
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// user update balance
router.put("/balance/update", Authorization, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.balance = user.balance + req.body.balance;
    await user.save();

    var transaction = new Transaction({
      amount: req.body.balance,
      payment_method: req.body.paymentMethod || "credit_card",
      user_id: req.user._id,
    });
    transaction = await transaction.save();

    res.send({ user, transaction });
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// admin update balance
router.put("/admin/balance-update/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.balance = user.balance + Number(req.body.balance);
    await user.save();
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

// Delete user By ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (error) {
    ApiError(res, 500, "Server Error", error);
  }
});

module.exports = router;
