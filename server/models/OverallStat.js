import mongoose from "mongoose";

// OverallStat Data Example
// ***************************************************************

// {
//   totalCustomers: 5251,
//   yearlySalesTotal: 65152,
//   yearlyTotalSoldUnits: 12969,
//   year: 2021,
//   monthlyData: [
//     {
//       month: "January",
//       totalSales: 6166,
//       totalUnits: 17738,
//       _id: "637000f7a5a686695b5170b1",
//     },
//   ],
//   dailyData: [
//     { date: "2021-01-02", totalSales: 4440, totalUnits: 178 },
//     { date: "2021-01-03", totalSales: 9208, totalUnits: 277 },
//     { date: "2021-01-04", totalSales: 4078, totalUnits: 564 },
//     { date: "2021-01-05", totalSales: 7537, totalUnits: 521 },
//   ],
//   salesByCategory: {
//     shoes: 6515,
//     clothing: 22803,
//     accessories: 16288,
//     misc: 19545,
//   },
//   _id: "636ffd4fc7195768677097d7",
//   createdAt: "1983-01-10T18:53:05.874Z",
//   updatedAt: "2019-07-06T05:12:27.736Z",
//   __v: 36729,
// },

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    // if they are all the same type, you can write it this way without having
    // to spell out each individual category...
    // salesByCategory: {
    //   shoes: Number,
    //   clothing: Number,
    //   clothing: Number,
    //   accessories: Number,
    //   misc: Number,
    // },
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
