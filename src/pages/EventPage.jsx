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
          {categories.map((category) => {
            return (
              <>
                {event.categoryIds.includes(category.id) && (
                  <span key={category.id}>{category.name} </span>
                )}
              </>
            );
          })}
        </p>
        <p>
          created by:{" "}
          {users.map((user) => {
            return (
              event.createdBy == user.id && (
                <span key={user.id}>{user.name}</span>
              )
            );
          })}
        </p>

        <EditModal />
        <DeleteModal eventId={params.eventId} />
      </div>
    </>
  );
};
