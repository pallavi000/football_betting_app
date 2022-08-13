const { Router } = require("express");
const router = Router();
const AdminAuth = require("../middleware/AdminAuth");
const UserCard = require("../model/UserCard");

function getLastMonthDates() {
  var start = new Date();
  start.setMonth(start.getMonth() - 1);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  var end = new Date();
  end.setDate(1);
  end.setHours(0, 0, 0, 0);
  return { start, end };
}

function getYesterdayDates() {
  var yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 2);
  yesterdayStart.setHours(0, 0, 0, 0);
  var yesterdayEnd = new Date();
  yesterdayEnd.setHours(0, 0, 0, 0);
  return { yesterdayStart, yesterdayEnd };
}

function getTodaysDates() {
  var todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  var todayEnd = new Date();
  todayEnd.setDate(todayEnd.getDate() + 1);
  todayEnd.setHours(0, 0, 0, 0);
  return { todayStart, todayEnd };
}

function parseEveryHourData(everyHour) {
  // GENERATE NULL HOURS FOR 23 HOURS IN ARRAY
  let hours = [];
  const currentHour = new Date().getHours();
  for (let i = 0; i < 24; i++) {
    if (i <= currentHour) {
      hours.push({ _id: i, price: 0 });
    } else {
      hours.push({ _id: i, price: null });
    }
  }
  // MERGE WITH QUERY RESULT
  let mergeArray = hours.map((h) => {
    let f = everyHour.find((r) => h._id === r._id);
    return f ? f : h;
  });
  return mergeArray;
}

// Get all dashboards
router.get("/", async (req, res) => {
  try {
    // company total balance
    const totalBalance = await UserCard.aggregate([
      { $group: { _id: null, price: { $sum: "$price" }, count: { $sum: 1 } } },
    ]);

    // company last month balance
    const { start, end } = getLastMonthDates();
    const previousMonthBalance = await UserCard.aggregate([
      { $match: { createdAt: { $gte: start, $lte: end } } },
      { $group: { _id: null, price: { $sum: "$price" }, count: { $sum: 1 } } },
    ]);

    // company this month balance
    const thisMonthBalance = await UserCard.aggregate([
      { $match: { createdAt: { $gte: end } } },
      { $group: { _id: null, price: { $sum: "$price" }, count: { $sum: 1 } } },
    ]);

    // company yesterday balance
    const { yesterdayStart, yesterdayEnd } = getYesterdayDates();
    const yesterdayBalance = await UserCard.aggregate([
      { $match: { createdAt: { $gte: yesterdayStart, $lte: yesterdayEnd } } },
      { $group: { _id: null, price: { $sum: "$price" }, count: { $sum: 1 } } },
    ]);

    const { todayStart, todayEnd } = getTodaysDates();

    // every hour data
    const everyHour = await UserCard.aggregate([
      { $match: { createdAt: { $gte: todayStart, $lte: todayEnd } } },
      {
        $group: {
          _id: { $hour: { date: "$createdAt", timezone: "+0545" } },
          price: { $sum: "$price" },
        },
      },
    ]);

    console.log(everyHour);

    const latestBets = await UserCard.find()
      .populate(["user_id"])
      .sort("-_id")
      .limit(10);

    res.json({
      totalBalance: totalBalance.length ? totalBalance[0].price : 0,
      previousMonthBalance: previousMonthBalance.length
        ? previousMonthBalance[0].price
        : 0,
      thisMonthBalance: thisMonthBalance.length ? thisMonthBalance[0].price : 0,
      yesterdayBalance: yesterdayBalance.length ? yesterdayBalance[0].price : 0,
      everyHourData: parseEveryHourData(everyHour),
      latestBets,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
