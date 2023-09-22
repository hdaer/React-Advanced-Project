import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Divider,
  Flex,
  Image,
} from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  return (
    <Link to={`event/${event.id}`}>
      <Flex flexDirection={"row"} gap={"3em"}>
        <Card margin={"2"} height={"400px"} width={"300px"} bg={"#E2E8F0"}>
          <CardBody>
            <Image
              src={event.image}
              fallbackSrc="https://via.placeholder.com/150"
              alt={event.title}
              w="100%"
              h="12rem"
              objectFit="cover"
              borderRadius="lg"
            />

            <Flex flexDir={"column"} mt="6" spacing="3">
              <Heading size="md" color={"#E55604"}>
                {event.title}
              </Heading>
              <Text color={"#26577C"} mt="1rem" noOfLines={"2"}>
                {event.description}
              </Text>
            </Flex>
          </CardBody>
          <Divider />
          <CardFooter
            h={"2rem"}
            display={"flex"}
            gap={"1rem"}
            alignItems={"center"}
          >
            {categories.map((category) => {
              return event.categoryIds.includes(category.id) ? (
                <Text key={category.id} color={"#26577C"}>
                  {category.name}{" "}
                </Text>
              ) : null;
            })}
          </CardFooter>
        </Card>
      </Flex>
    </Link>
  );
};
