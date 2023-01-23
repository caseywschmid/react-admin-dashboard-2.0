import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

export const getAdmins = async (request, response) => {
  try {
    // Returns all the admins. In the data, an admin is defined as a User
    // with the role: admin or superadmin. select() here removes the password from getting
    // passed to the front-end.
    const admins = await User.find({ role: ["admin", "superadmin"] }).select(
      "-password"
    );
    // Send that data to the front end
    response.status(200).json(admins);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
export const getUserPerformance = async (request, response) => {
  try {
    const { id } = request.params;

    // https://www.mongodb.com/docs/manual/aggregation/ This call will merge the
    // affiliateStats data with the associated userId
    const userWithStats = await User.aggregate([
      // grabs the params id, converts it to the right format for MongoDB and
      // matches it to the user who has this particular id.
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // looks in the affiliatestats table for the foreign key associated with
      // the _id. Save that info in an array called affiliateStats
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      // Flattens array
      { $unwind: "$affiliateStats" },
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );
    // Send that data to the front end
    response
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
