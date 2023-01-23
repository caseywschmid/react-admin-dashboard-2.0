import OverallStat from "../models/OverallStat.js";

// This is the function used by the Router
// request is where you can get the params and the body
// response is where we send data back to the front end.
export const getSales = async (request, response) => {
  try {
    // returns all the stats
    const overallStats = await OverallStat.find();

    // Send that data to the front end
    // Since there is only data for a single year and this data will return an
    // array, I'm going to specify the first index
    response.status(200).json(overallStats[0]);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
