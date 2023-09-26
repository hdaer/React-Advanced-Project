import React from "react";
import { Link, useParams } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import { NewEventModal } from "../NewEventModal";

export const Navigation = () => {
  const params = useParams();

  return (
    <nav style={{ backgroundColor: "#B4B4B3" }}>
      {Object.keys(params).length != 0 ? (
        <Flex height="100%" justifyContent="flex-start" alignItems="center">
          <Button color={"#26577C"} margin={"0.5rem 1rem"}>
            <Link to="/">All Events</Link>
          </Button>
        </Flex>
      ) : (
        <NewEventModal />
      )}
    </nav>
  );
};
