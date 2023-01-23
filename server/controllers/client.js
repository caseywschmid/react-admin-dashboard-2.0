import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";

// This is the function used by the Router
// request is where you can get the params and the body
// response is where we send data back to the front end.
export const getProducts = async (request, response) => {
  try {
    // returns all the products
    const products = await Product.find();
    // for every product, use its "id" to query the associated stats
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });
        // return an array of objects with both the product information and any
        // stats it has. Combining them both into one big object.
        return {
          ...product._doc,
          stat,
        };
      })
    );
    // Send that data to the front end
    response.status(200).json(productsWithStats);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (request, response) => {
  try {
    // Returns all the customers. In the data, a customer is defined as a User
    // with the role: user. select() here removes the password from getting
    // passed to the front-end.
    const customers = await User.find({ role: "user" }).select("-password");
    // Send that data to the front end
    response.status(200).json(customers);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

// Implemented Server Side Pagination with this Controller
export const getTransactions = async (request, response) => {
  try {
    // To set up SSP, you need to pull some data from the front end. Sort, from
    // the front end should look like : {"field": "userId", "sort": "desc"}
    const { page = 1, pageSize = 20, sort = null, search = "" } = request.query;

    // MongoDB needs a sort formatted like this: {userId: -1}
    // where 1 is ascending and -1 is descending.
    // this function converts the format we got from the front into what MDB needs
    const generateSort = () => {
      // parse the string the front end sends me into an object
      const sortParsed = JSON.parse(sort);
      // Checks the front end value for sort. Converts to 1 or -1 based on
      // ascending or descending
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };

    // Check to see if theres a sort value, if there is, convert it, otherwise
    // use and empty object.
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      // $or allows you to unput several different values to be searched
      $or: [
        // found the solution to getting cost working as a Number here:
        // https://stackoverflow.com/questions/13217908/find-by-type-number-in-mongodb
        { cost: { $type: 1 } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      // Sorts based on what the user wanted
      .sort(sortFormatted)
      // when retriving new values, skip a page
      // this makes the pagination work on the front
      .skip(page * pageSize)
      // only provide the desired number of results at a time
      .limit(pageSize);

    // We still need to know how many total results there are so we can
    // display that information on the front end.
    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    // Send data to the front end
    response.status(200).json({ transactions, total });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getGeography = async (request, response) => {
  try {
    // Returns all the geolocations for each User formatted for the Nivo Chart.
    // The Nivo Choropleth Chart needs data formatted like this:
    // [
    //   {
    //     id: "AFG",
    //     value: 246,
    //   },
    //   {
    //     id: "AFO",
    //     value: 754,
    //   },
    // ];
    // The countries in my data are 2 letters and Nivo requires 3.
    // Installed country-iso-2-to-3 to help with this

    // First, retrieve all users
    const users = await User.find();

    //
    const mappedLocations = users.reduce((accumulator, { country }) => {
      // converts country to 3 places
      const convertedCountry = getCountryIso3(country);
      // if the country doesn't already exist, initialize its value to 0
      if (!accumulator[convertedCountry]) {
        accumulator[convertedCountry] = 0;
      }
      accumulator[convertedCountry]++;
      return accumulator;
    }, {});

    // the data still isn't in the format I need
    // I map over the returned values to reformat it
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    // Send that data to the front end
    response.status(200).json(formattedLocations);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};
