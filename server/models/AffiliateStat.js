import mongoose from "mongoose";

const AffiliateStatSchema = new mongoose.Schema(
  {
    // This has to be an ObjectId that MongoDB states
    // One to One Relationship in the DB
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    // One to Many Relationship in the DB
    affiliateSales: { type: [mongoose.Types.ObjectId], ref: "Transaction" },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;
