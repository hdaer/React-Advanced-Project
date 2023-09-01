import React, { useEffect, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { Heading, Input, Button } from "@chakra-ui/react";
// import { NewEventModal } from "../components/NewEventModal";
import { SearchBar } from "../components/ui/SearchBar";

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

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  const initalState = "";
  const [searchInput, setSearchInput] = useState(initalState);
  const [eventSearchResults, setEventSearchResults] = useState([]);

  const handleClick = () => {
    const filteredItems = events.filter((event) => {
      return event.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    setEventSearchResults(() => {
      return filteredItems;
    });
    console.log(filteredItems);
    console.log(eventSearchResults);
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleReset = () => {
    setSearchInput(() => initalState);
    console.log(searchInput);
  };

  // useEffect = ( , [eventSearchResults])

  return (
    <div className="events-page">
      {/* <NewEventModal /> */}

      <Heading>List of events:</Heading>

      <SearchBar
        handleReset={handleReset}
        handleChange={handleChange}
        handleClick={handleClick}
      />

      {events.map((event) => {
        return (
          <div key={event.id} className="event">
            <Link to={`event/${event.id}`}>
              <p>{event.title}</p>
              <p>{event.description}</p>
              <img
                src={event.image}
                alt={event.title}
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
