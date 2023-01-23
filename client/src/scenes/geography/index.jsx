import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import GeoChart from "components/GeoChart";

// Here's an example of the User data for this project
// {
//   _id: "63701cc1f03239c72c000184",
//   name: "Donelle",
//   email: "dcrossgrove5@constantcontact.com",
//   city: "São Jerônimo",
//   state: null,
//   country: "BR",
//   occupation: "Chemical Engineer",
//   phoneNumber: "8601650433",
//   transactions: [
//     "63701d74f03239d40b000078",
//     "63701d74f03239db69000157",
//     "63701d74f03239b7f7000025",
//     "63701d74f032395694000042",
//     "63701d74f03239d591000339",
//     "63701d74f03239b7f700003d",
//     "63701d74f032396b8e000029",
//     "63701d74f03239d81e00003e",
//     "63701d74f03239d81e000032",
//     "63701d74f03239db6900013d",
//   ],
//   role: "user",
// },

const Geography = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Geography" subtitle="Your users across the world." />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary[200]}`}
        borderRadius="4px"
      >
        <GeoChart />
      </Box>
    </Box>
  );
};

export default Geography;
