import React from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAdminsQuery } from "state/api.js";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

// Columns for the DataGrid Table are specified as an array of objects. Each
// object contains a "field" which is the key for the data you want to go in
// the column, and a "headerName" which is the displayed name for the
// column. Adding flex to the object allows it to grow when the widow is resized
// Here's an example of the data for this project
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

const columns = [
  { field: "_id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    flex: 1,
    renderCell: (params) => {
      return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    },
  },
  { field: "country", headerName: "Country", flex: 0.5 },
  { field: "occupation", headerName: "Occupation", flex: 1 },
  { field: "role", headerName: "Role", flex: 0.5 },
];

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Admins" subtitle="Managing Administrators" />
      {/* Its required to set a height for the datagrid otherwise 
      it'll display nothing. */}
      <Box
        mt="40px"
        height="75vh"
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
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],

          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          }
        }}
      >
        <DataGrid
          rows={data || []}
          columns={columns}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          components={{ ColumnMenu: CustomColumnMenu }}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Admin;