import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import PieChart from "components/PieChart";

const Breakdown = () => {

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Breakdown" subtitle="Sales By Category" />
      <PieChart />
    </Box>
  );
};

export default Breakdown;
