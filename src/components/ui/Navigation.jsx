import React from "react";
import { Link, useParams } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import { NewEventModal } from "../NewEventModal";
import { DeleteModal } from "../DeleteModal";
import { EditModal } from "../EditModal";

export const Navigation = () => {
  const params = useParams();
  console.log(params);

  return (
    <nav>
      <ul style={{ listStyleType: "none" }}>
        <Flex justifyContent={"center"} flexDirection={"row"} gap={"3em"}>
          <li>
            <Button>
              <Link to="/">HOME</Link>
            </Button>
          </li>

          {Object.keys(params).length != 0 ? (
            <>
              {" "}
              <li>
                <EditModal eventId={params.eventId} />
              </li>
              <li>
                <DeleteModal eventId={params.eventId} />
              </li>
            </>
          ) : (
            <li>
              <NewEventModal />
            </li>
          )}
        </Flex>
      </ul>
    </nav>
  );
};
