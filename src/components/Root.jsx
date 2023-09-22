import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./ui/Navigation";
import { Footer } from "./ui/Footer";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const Root = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navigation />
      <Outlet />
      <Footer />
    </LocalizationProvider>
  );
};
