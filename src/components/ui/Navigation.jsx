import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <Flex flexDirection={"row"} gap={"3em"}>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
          <li>
            <Link to="/newevent">New Event</Link>
          </li>
          <li>
            <Link to="/testpage">Test Page</Link>
          </li>
        </Flex>
      </ul>
    </nav>
  );
};
