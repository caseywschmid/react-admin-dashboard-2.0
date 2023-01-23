import React, { useState } from "react";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransactionsQuery } from "state/api";
import { Box, useTheme } from "@mui/material";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();

  // values to send to the back end
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  // To keep from making an API call to the back end for every keystroke in the
  // search box, I created a state to handle that and only set the search value
  // once the "search button" gets clicked.
  const [searchInput, setSearchInput] = useState("");

  // Anytime one of these parameters gets changed, a new API call will be made.
  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

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

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="Complete list of all transactions." />
      <Box
        mt="40px"
        height="80vh"
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
          },
        }}
      >
        {/* Ran into an issue here where I forgot to give the DB time to 
        get the data before rendering. I fixed this problem by adding 
        the conditional here. */}
        {/* getRowId is how you specify a different ID other than 
        ".id" which is default */}
        <DataGrid
          rows={(data && data.transactions) || []}
          columns={columns}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          // Server Side Pagination attributes
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
          rowsPerPageOptions={[20, 50, 100]}
        ></DataGrid>
      </Box>
    </Box>
  );
};

export default Transactions;
