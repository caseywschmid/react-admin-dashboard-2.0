import React from "react";
import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";

// API Calls
import { useGetUserQuery } from "state/api";

const Layout = () => {
  // starting boolean variables with "is" can help other members on your team
  // read your code.
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    isNonMobile ? true : false
  );
  // Grab userId created using Redux Toolkit
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  // console.log("🚀 ~ file: index.jsx:22 ~ Layout ~ data", data);

  // Had an issue with the drawer not animating the way it should. Found an answer
  // saying that the state change cant be handled directly in the onClose prop.
  // You've gotta pass it to an external function and do it there for the built in
  // animations to work. 
  // Still didn't work  :|

  const handleDrawerOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleDrawerClose = () => {
    setIsSidebarOpen(false);
  };

  const toggleDrawer = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        toggleDrawer={toggleDrawer}
      />
      {/* The NavBar was not stretching all the way across the page. Adding Flex Grow fixed that... */}
      <Box flexGrow={1}>
        {/* Passing these props to allow opening and closing the sidebar with a button on the Navbar */}
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleDrawer={toggleDrawer}
        />
        {/* Outlet will render whatever child component comes next in the routes */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
