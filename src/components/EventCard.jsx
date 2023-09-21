import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Divider,
  Flex,
  ButtonGroup,
  Button,
  Image,
} from "@chakra-ui/react";

export const EventCard = ({ event, categories }) => {
  return (
    <Flex flexDirection={"row"} gap={"3em"}>
      <Link to={`event/${event.id}`}>
        <Card margin={"2"} height={"400px"} width={"300px"} bg={"#E2E8F0"}>
          <CardBody>
            <Image
              src={event.image}
              alt={event.title}
              w="100%"
              h="12rem"
              objectFit="cover"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{event.title}</Heading>
              <Text>{event.description}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            {categories.map((category) => {
              return event.categoryIds.includes(category.id) ? (
                <Flex margin={"0.2em"} key={category.id}>
                  {category.name}{" "}
                </Flex>
              ) : null;
            })}
          </CardFooter>
        </Card>
      </Link>
    </Flex>

    // <div key={event.id} className="eventcard">
    //   <Link to={`event/${event.id}`}>
    //     <p>{event.title}</p>
    //     <p>{event.description}</p>
    //     <img src={event.image} alt={event.title} width="500" height="600" />
    //     <p>
    //       start: {event.endTime.substring(0, 10)},{" "}
    //       {event.endTime.substring(11, 16)}
    //     </p>
    //     <p>
    //       end: {event.endTime.substring(0, 10)},{" "}
    //       {event.endTime.substring(11, 16)}
    //     </p>
    //     <p>
    //       Category:{" "}
    //       {categories.map((category) => {
    //         return event.categoryIds.includes(category.id) ? (
    //           <span key={category.id}>{category.name} </span>
    //         ) : null;
    //       })}
    //     </p>
    //   </Link>
    // </div>
  );
};
