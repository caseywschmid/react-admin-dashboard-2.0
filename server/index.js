import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Imported Routes
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// The following routes will be used to pull data from the database. The
// dashboard sidebar will be set up into 3 larger sections: Client, Sales, &
// Management. Each section will have its own set of specific pages the user can
// access and each page will require data from the database. The general route
// is for things like getting the user and providing data to the main dashboard.
// Each of these routes will have its own dedicated file. These need to be
// imported at the top.

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// **********************************************************
//                      Mongoose Setup
// **********************************************************

// process.env allows you to access the variables set in your .env file.
// a backup port is provided just in case.
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    //*************************************************
    // Only add the data once!!
    //*************************************************
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // OverallStat.insertMany(dataOverallStat);
    // AffiliateStat.insertMany(dataAffiliateStat);
    //*************************************************
  })
  .catch((error) => console.log(`${error} did not connect`));
