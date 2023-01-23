import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

// This is the function used by the Router
// req is where you can get the params and the body
// res is where we send data back to the front end.
export const getUser = async (request, response) => {
  try {
    // Based on the params of the id
    // id because I specified that in the routes/general.js
    // the id will be passed in from the front end
    const { id } = request.params;
    // try to find the user
    const user = await User.findById(id);
    // if its there, send that info to the front-end.
    response.status(200).json(user);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getDashboardStats = async (request, response) => {
  try {
    // I want to compile all the stat information into a single spot so that the
    // app doesn't have to make multiple API calls when the user lands on the
    // Dashboard
    // Due to limitations in the data, I'm hardcoding a few values.
    // Normally, these would be retrieved from the DB
    // Manual Inputs
    const currentMonth = "August";
    const currentYear = 2022;
    const currentDay = "2022-08-16";

    // recent transactions
    const transactions = await Transaction.find()
      .limit(50)
      .sort({ createdOn: -1 });

    // Overall Stats
    const overallStat = await OverallStat.find({ year: currentYear });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStat[0];

    const thisMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });
    console.log("🚀 ~ file: general.js:59 ~ todayStats ~ todayStats", todayStats)



    response
      .status(200)
      .json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
        overallStat
      });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

