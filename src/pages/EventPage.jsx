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

  const date = event.endTime.substring(0, 10);
  const reverseString = (str) => {
    const splitString = str.split("-");
    const reverseArray = splitString.reverse();
    const joinArray = reverseArray.join("-");
    return joinArray;
  };
  const reverseDate = reverseString(date);

  const start = event.startTime.substring(11, 16);
  const end = event.endTime.substring(11, 16);

  return (
    <Container
      marginTop={"2rem"}
      marginBottom={"2rem"}
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
        <Flex justifyContent={"center"}>
          <Image
            h={"35vh"}
            objectFit={"cover"}
            src={event.image}
            fallbackSrc="https://via.placeholder.com/300"
            alt={event.title}
            mb={"1rem"}
            borderRadius={"20px"}
          />
        </Flex>

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
            <Text>{reverseDate}</Text>

            <Text fontWeight={"bold"}>start:</Text>
            <Text>{start}</Text>

            <Text fontWeight={"bold"}>end:</Text>
            <Text>{end}</Text>
          </Grid>
        </Box>

        <Flex
          w={"70%"}
          gap={"2rem"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"0.5rem"}
        >
          <EditModal event={event} />
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
