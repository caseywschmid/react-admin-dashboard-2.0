import { useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api.js";
import React, { useMemo } from "react";

const LineChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();
  console.log("🚀 ~ file: LineChart.jsx:8 ~ LineChart ~ data", data);

  // Nivo Line Chart needs data formatted like this:

  // [
  //   {
  //     id: "japan",
  //     color: "hsl(19, 70%, 50%)",
  //     data: [
  //       {
  //         x: "plane",
  //         y: 80,
  //       },
  //       {
  //         x: "helicopter",
  //         y: 24,
  //       },
  //     ],
  //   },
  //   {
  //     id: "france",
  //     color: "hsl(116, 70%, 50%)",
  //     data: [
  //       {
  //         x: "plane",
  //         y: 145,
  //       },
  //       {
  //         x: "helicopter",
  //         y: 251,
  //       },
  //     ],
  //   },
  // ];

  // I'll have to convert it to match. The data will be used for 4 pages in
  // total so each page will have to make adjustments to the data formatting so
  // it can be used.

  // Using useMemo because I only want this to recalculate if the data changes
  // and nothing else.
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    // if theres no data return empty array
    if (!data) return [];

    // destructure to use only the monthlyData from data
    const { monthlyData } = data;

    // create totalSales object that matches required format
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    // create totalUnits object that matches required format
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    // I want each month to be cumulative for all the previous months as well.
    // Each months individual sales won't be displayed, it'll be the total for
    // the year up to that point.
    Object.values(monthlyData).reduce(
      (accumulator, { month, totalSales, totalUnits }) => {
        const currentSales = accumulator.sales + totalSales;
        const currentUnits = accumulator.units + totalUnits;
        // add the data to the totalSalesLine object
        totalSalesLine.data = [
          // previous value + new value
          ...totalSalesLine.data,
          { x: month, y: currentSales },
        ];
        // add the data to the totalUnitsLine object
        totalUnitsLine.data = [
          // previous value + new value
          ...totalUnitsLine.data,
          { x: month, y: currentUnits },
        ];
        return { sales: currentSales, units: currentUnits };
      },
      // initalize two separate counters for the year
      { sales: 0, units: 0 }
    );

    return [[totalSalesLine], [totalUnitsLine]]
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            // color: theme.palette.secondary.main,
            color: "#000000",
          },
        },
      }}
      // Added this to choose color scheme when being used on dashboard
      // to get this to work, had to change color tokens in the Line Data
      // colors={"nivo"}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      // enableArea = "true"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // Remove the axis if being used on Dashboard
        legend: isDashboard ? undefined : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        // Adding this limits the number of ticks
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        // Remove the axis if being used on Dashboard
        legend: isDashboard
          ? undefined
          : `Total ${view === "sales" ? "Revenue" : "Units"} for the Year`,
        legendOffset: -65,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      enableArea={isDashboard}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "top-left",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default LineChart;
