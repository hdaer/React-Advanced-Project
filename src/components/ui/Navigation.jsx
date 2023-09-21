import React from "react";
import { Link, useParams } from "react-router-dom";
import { Flex, Button, UnorderedList, ListItem } from "@chakra-ui/react";
import { NewEventModal } from "../NewEventModal";

export const Navigation = () => {
  const params = useParams();

  return (
    <nav>
      <UnorderedList ml={"0"} style={{ listStyleType: "none" }}>
        <Flex justifyContent={"center"} backgroundColor={"#B4B4B3"}>
          {Object.keys(params).length != 0 ? (
            <ListItem>
              <Button color={"#26577C"} margin={".5rem 0 .5rem"}>
                <Link to="/">Events</Link>
              </Button>
            </ListItem>
          ) : (
            <ListItem>
              <NewEventModal />
            </ListItem>
          )}
        </Flex>
      </UnorderedList>
    </nav>
  );
};
