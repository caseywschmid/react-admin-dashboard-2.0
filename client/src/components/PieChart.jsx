import { ResponsivePie } from "@nivo/pie";
import { Box, useTheme, Typography } from "@mui/material";
import { useGetSalesQuery } from "state/api";

const PieChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery();
  const theme = useTheme();

  if (!data || isLoading) return "Loading...";

  // Example data

  // salesByCategory: {
  //   shoes: 6515,
  //   clothing: 22803,
  //   accessories: 16288,
  //   misc: 19545,
  // },

  // Needed data

  // [
  //   {
  //     id: "hack",
  //     label: "hack",
  //     value: 182,
  //     color: "hsl(207, 70%, 50%)",
  //   },
  // ];

  // const colors = [
  //   theme.palette.secondary.dark,
  //   theme.palette.secondary.light,
  //   theme.palette.secondary.main,
  //   theme.palette.secondary[500],
  // ];

  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, quantity], i) => ({
      id: category,
      label: category,
      value: quantity,
      // I could place my own custom colors above.
      // I decided to use one of the Nivo color schemes
      color: "",
    })
  );

  return (
    <Box mt="40px" height="75vh">
      <Box
        height={isDashboard ? "400px" : "100%"}
        width={undefined}
        minHeight={isDashboard ? "325px" : undefined}
        minWidth={isDashboard ? "325px" : undefined}
        // Relative so the the total can be placed in the center
        position="relative"
      >
        <ResponsivePie
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
                // color: theme.palette.secondary.main,
                color: "#000000",
              },
            },
          }}
          margin={
            isDashboard
              ? { top: 40, right: 80, bottom: 100, left: 50 }
              : { top: 40, right: 80, bottom: 80, left: 80 }
          }
          innerRadius={0.4}
          padAngle={0.6}
          cornerRadius={3}
          sortByValue={true}
          activeInnerRadiusOffset={7}
          activeOuterRadiusOffset={17}
          colors={{ scheme: "yellow_green_blue" }}
          // to use custome colors
          // colors={{ datum: "data.color" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          enableArcLinkLabels={!isDashboard}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor={theme.palette.secondary.light}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          // Formatted this to look like currency
          arcLabel={total => `$${new Intl.NumberFormat().format(total.value)}`}
          arcLabelsRadiusOffset={0.45}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          motionConfig="wobbly"
          transitionMode="outerRadius"
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: isDashboard ? 20 : 0,
              translateY: isDashboard ? 50 : 76,
              itemsSpacing: 0,
              itemWidth: 85,
              itemHeight: 18,
              itemTextColor: "#999",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: theme.palette.primary[500],
                  },
                },
              ],
            },
          ]}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          color={theme.palette.secondary[400]}
          textAlign="center"
          pointerEvents="none"
          sx={{
            transform: isDashboard
              ? "translate(-75%, -170%)"
              : "translate(-50%, -100%)",
          }}
        >
          {/*   */}
          <Typography variant="h6">
            {!isDashboard && `Total: $${new Intl.NumberFormat().format(data.yearlySalesTotal)}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PieChart;
