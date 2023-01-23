import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../state/geoData";
import { useGetGeographyQuery } from "state/api.js";

const GeoChart = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetGeographyQuery();
  console.log("🚀 ~ file: GeoChart.jsx:10 ~ GeoChart ~ data", data);

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveChoropleth
      data={data || []}
      features={geoData.features}
      colors="YlGnBu"
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
        // Changes the default behavior of the hover info
        tooltip: {
          container: {
            background: "#ffffff",
            color: "#333333",
            fontSize: 12,
          },
        },
      }}
      margin={{ top: -120, right: 0, bottom: 0, left: 50 }}
      // This is the provded color scheme. It doesn't match the colors of the app
      // so its commented out. Turns out that removing it causes the colors to
      // default to a theme that works more with the site.
      // colors="nivo"
      domain={[0, 54]}
      unknownColor={theme.palette.primary[400]}
      label="properties.name"
      // valueFormat=".2s"
      // Added this to change the projection scale when on the dashboard or the
      // regular page. Zooms in on the reg page since there's more room
      // projectionScale={isDashboard ? 40 : 150}
      projectionScale={150}
      // Changed these values from initial ones.
      // projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionTranslation={[0.45, 0.6]}
      projectionRotation={[0, 0, 0]}
      // This is the grid behind the map
      enableGraticule={false}
      borderWidth={0.5}
      borderColor="#ffffff"
      Remove
      the
      legend
      if
      on
      dashboard
      legends={[
        {
          anchor: "bottom-left",
          direction: "column",
          justify: true,
          translateX: 0,
          translateY: -100,
          itemsSpacing: 10,
          itemWidth: 65,
          itemHeight: 30,
          itemDirection: "left-to-right",
          itemTextColor: "#ffffff",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#999999",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default GeoChart;
