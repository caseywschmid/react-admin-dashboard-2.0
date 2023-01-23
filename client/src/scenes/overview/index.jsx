import React from "react";
import Header from "components/Header";
import { useState } from "react";
import LineChart from "../../components/LineChart";
import { FormControl, MenuItem, InputLabel, Select, Box } from "@mui/material";

const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Sales Overview"
        subtitle="See your annual sales overview"
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <LineChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
