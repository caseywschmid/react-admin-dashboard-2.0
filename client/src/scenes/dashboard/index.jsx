import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PieChart from "components/PieChart";
import LineChart from "components/LineChart";
import { useGetDashboardQuery } from "state/api";

// ****************************************************
//           DASHBOARD STAT CARD COMPONENT
// ****************************************************

const StatCard = ({ name, icon, value, percentage }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {name}
        </Typography>
        {icon}
      </FlexBetween>
      <Typography
        variant="h3"
        fontWeight="600"
        sx={theme.palette.secondary[100]}
      >
        {value}
      </Typography>
      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {percentage}
        </Typography>
        <Typography>Since Last Month</Typography>
      </FlexBetween>
    </Box>
  );
};

// Copied from Transactions
const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "userId",
    headerName: "User ID",
    flex: 0.5,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${params.value}`,
  },
];

// ****************************************************
//                 DASHBOARD COMPONENT
// ****************************************************

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  if (!data || isLoading) return "Loading...";

  console.log("???? ~ file: index.jsx:59 ~ Dashboard ~ data", data);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      {/* GRID & CHARTS */}

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 01 */}

        <StatCard
          name="Total Customers"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          value={data && data.totalCustomers}
          percentage="+23%"
          text="Since Last Month"
        />

        <StatCard
          name="Sales Today"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          value={data && data.todayStats.totalSales}
          percentage="+14%"
          text="Since Last Month"
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <LineChart view="sales" isDashboard={true} />
        </Box>

        <StatCard
          name="MonthlySales"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          value={data && data.thisMonthStats.totalSales}
          percentage="+6%"
          text="Since Last Month"
        />

        <StatCard
          name="Yearly Sales"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
          value={data && data.yearlySalesTotal}
          percentage="+36%"
          text="Since Last Month"
        />

        {/* ROW 02 */}

        <Box
          gridColumn="span 8"
          gridRow="span 3"
          // Copied from Transactions
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.dark,
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="0rem 0.3rem"
          flex="1 1 100%"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <DataGrid
            rows={(data && data.transactions) || []}
            columns={columns}
            loading={isLoading || !data}
            getRowId={(row) => row._id}
          ></DataGrid>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 3"
          p="1.5rem"
          backgroundColor={theme.palette.background.alt}
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales By Category
          </Typography>
          <PieChart isDashboard={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
