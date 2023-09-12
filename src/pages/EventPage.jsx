import { useParams, useLoaderData } from "react-router-dom";
import { Heading } from "@chakra-ui/react";

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
    <>
      <Heading>Event</Heading>
      <div className="event">
        <p>{event.title}</p>
        <p>{event.description}</p>
        <img src={event.image} alt={event.title} width="500" height="600" />
        <p>
          start: {event.endTime.substring(0, 10)},{" "}
          {event.endTime.substring(11, 16)}
        </p>
        <p>
          end: {event.endTime.substring(0, 10)},{" "}
          {event.endTime.substring(11, 16)}
        </p>
        <p>
          Category:{" "}
          {event.categoryIds.map((categoryId) => {
            return (
              <span key={categoryId}>
                {categories[Number(categoryId) - 1].name}{" "}
              </span>
            );
          })}
        </p>
        <p>created by: {users[event.createdBy - 1].name}</p>

        <EditModal />
        <DeleteModal eventId={params.eventId} />
      </div>
    </>
  );
};
