import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";

import { useGetSalesQuery } from "state/api";


const Monthly = () => {

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    // if theres no data return empty array
    if (!data) return [];

    // destructure to use only the dailyData from data
    const { monthlyData } = data;

    // create totalSales object that matches required Nivo Charts format
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };

    // create totalUnits object that matches required Nivo Charts format
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    // Example monthly data

    // monthlyData: [
    //   {
    //     month: "January",
    //     totalSales: 6166,
    //     totalUnits: 17738,
    //     _id: "637000f7a5a686695b5170b1",
    //   },
    // ];

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      // add the data to the totalSalesLine object
      totalSalesLine.data = [
        // previous value + new value
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      // add the data to the totalUnitsLine object
      totalUnitsLine.data = [
        // previous value + new value
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Monthly Overview" subtitle="See your monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
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
                  color: theme.palette.primary.main,
                },
              },
            }}
            // Added this to choose color scheme when being used on dashboard
            // to get this to work, had to change color tokens in the Line Data
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="monotoneX"
            enableArea="true"
            areaOpacity={0.3}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 15,
              tickRotation: 90,
              legend: "MONTH",
              legendOffset: 65,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              // Adding this limits the number of ticks
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "TOTAL",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
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
            ]}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
