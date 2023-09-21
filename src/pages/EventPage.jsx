import { useParams, useLoaderData } from "react-router-dom";
import {
  Flex,
  Heading,
  Container,
  Box,
  Text,
  Image,
  Grid,
} from "@chakra-ui/react";

import { EditModal } from "../components/EditModal";
import { DeleteModal } from "../components/DeleteModal";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");

  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};

export const EventPage = () => {
  const params = useParams();
  const { events, categories, users } = useLoaderData();

  const event = events.filter((event) => {
    return event.id == params.eventId;
  })[0];

  return (
    <Container
      marginTop={"2rem"}
      maxW={"75vw"}
      borderRadius={"20px"}
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      backgroundColor={"#EBE4D1"}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        paddingBottom={"1rem"}
      >
        <Heading color={"#26577C"} pb={"0.5rem"}>
          {event.title}
        </Heading>

        <Image
          src={event.image}
          alt={event.title}
          boxSize={"50%"}
          objectFit={"cover"}
          mb={"1rem"}
          borderRadius={"20px"}
        />

        <Box>
          <Flex gap={"3"}>
            {categories.map((category) => {
              return event.categoryIds.includes(category.id) ? (
                <Text
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                  fontSize={"1.5em"}
                  color={"#26577C"}
                  key={category.id}
                >
                  {category.name}{" "}
                </Text>
              ) : null;
            })}
          </Flex>
        </Box>

        <Box mb={"1"}>{event.description}</Box>

        <Box backgroundColor={"#B4B4B3"} borderRadius={"10px"} p={"2"}>
          <Grid
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(2, 1fr)"
            gap={1}
          >
            <Text fontWeight={"bold"}>date:</Text>
            <Text>{event.endTime.substring(0, 10)}</Text>

            <Text fontWeight={"bold"}>start:</Text>
            <Text>{event.startTime.substring(11, 16)}</Text>

            <Text fontWeight={"bold"}>end:</Text>
            <Text>{event.endTime.substring(11, 16)}</Text>
          </Grid>
        </Box>

        <Flex
          w={"50%"}
          gap={"2rem"}
          justifyContent={"space-between"}
          alignItems={"center"}
          // border={"1px solid red"}
          mt={"0.5rem"}
        >
          <EditModal />
          <Flex>
            {users.map((user) => {
              return event.createdBy == user.id ? (
                <Flex key={user.id} gap={"1"} alignItems={"center"}>
                  <Text fontStyle={"italic"}>Created by: {user.name}</Text>
                  <Image
                    src={user.image}
                    alt={user.name}
                    boxSize={"40px"}
                    borderRadius="full"
                  />
                </Flex>
              ) : null;
            })}
          </Flex>
          <DeleteModal eventId={params.eventId} />
        </Flex>
      </Flex>
    </Container>
  );
};
