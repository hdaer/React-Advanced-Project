import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { NewEventModal } from "../components/NewEventModal";

export const loader = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  return (
    <div className="events-page">
      <NewEventModal />

      <Heading>List of events:</Heading>
      {events.map((event) => {
        return (
          <div key={event.id} className="event">
            <Link to={`event/${event.id}`}>
              <p>{event.title}</p>
              <p>{event.description}</p>
              <img
                src={event.image}
                alt={event.description}
                width="500"
                height="600"
              />
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
            </Link>
          </div>
        );
      })}
    </div>
  );
};
