import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Root = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Navigation />
        <Outlet />
      </Box>
    </LocalizationProvider>
  );
};
