import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./ui/Navigation";
import { Footer } from "./ui/Footer";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid, GridItem } from "@chakra-ui/react";

export const Root = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid w={"100vw"} h={"100vh"} gridTemplateRows={"auto 1fr auto"}>
        <GridItem>
          <Navigation />
        </GridItem>
        <GridItem>
          <Outlet />
        </GridItem>
        <GridItem>
          <Footer />
        </GridItem>
      </Grid>
    </LocalizationProvider>
  );
};
