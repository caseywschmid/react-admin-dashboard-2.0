import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import { useSelector } from "react-redux";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";


function App() {
  // Redux
  // This is a way to grab the state that was created in the ./state folder.
  // It was made global so it's accessable everywhere.
  const mode = useSelector((state) => state.global.mode);

  // I'm passing the mode retrieved with redux above into creatTheme.
  // useMemo allows you to cache this value without having to re-render the page
  // Only computes when you actually need it to, in this case when you change modes.
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Any route within this component will have Layout 
            component as the main parent */}
            {/* This will allow me to add the Navbar and Sidebar 
            to every page */}
            {/* I'm going to use an Outlet Component to link the 
            required child component */}
            <Route element={<Layout />}>
              {/* If the user goes to the default homepage, send them to the 
              dashboard and render that */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
