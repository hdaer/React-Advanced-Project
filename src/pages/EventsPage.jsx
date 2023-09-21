import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Flex, Grid, GridItem, Button } from "@chakra-ui/react";
import { SearchBar } from "../components/ui/SearchBar";
import { EventCard } from "../components/EventCard";
import { CategoryFilter } from "../components/ui/CategoryFilter";

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

  const [searchedFilteredEvents, setSearchedFilteredEvents] = useState([]);

  const [searchInput, setSearchInput] = useState("");
  const [searchedEvents, setSearchedEvents] = useState([]);

  const handleClick = () => {
    const searchedItems = events.filter((event) => {
      return event.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchedEvents(searchedItems);
  };

  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    if (filteredEvents.length == 0 && searchedEvents.length == 0) {
      setSearchedFilteredEvents(events);
    } else if (filteredEvents.length == 0 && searchedEvents.length != 0) {
      setSearchedFilteredEvents(searchedEvents);
    } else if (filteredEvents.length != 0 && searchedEvents.length == 0) {
      setSearchedFilteredEvents(filteredEvents);
    } else if (filteredEvents.length != 0 && searchedEvents.length != 0) {
      let intersection = searchedEvents.filter((x) =>
        filteredEvents.includes(x)
      );

      setSearchedFilteredEvents(intersection);
    }
  }, [searchedEvents, filteredEvents]);

  return (
    <div className="events-page">
      <Grid
        templateAreas={`
                  "side main"
                  "side footer"`}
        gridTemplateColumns={"150px 1fr"}
        gridTemplateRows={"1fr 30px"}
        color={"#26577C"}
        fontWeight="bold"
      >
        <GridItem p="2" bg="#FFDBAA" area={"side"}>
          Category Filter
          <CategoryFilter
            events={events}
            categories={categories}
            setFilteredEvents={setFilteredEvents}
          />
        </GridItem>
        <GridItem pl="2" bg="#EBE4D1" area={"main"}>
          <Flex justifyContent={"center"}>
            <SearchBar
              setSearchInput={setSearchInput}
              handleClick={handleClick}
            />
          </Flex>
          <Flex flexWrap={"wrap"} border={"1px solid red"}>
            {searchedFilteredEvents.map((event) => {
              return (
                <EventCard
                  key={event.id}
                  event={event}
                  categories={categories}
                />
              );
            })}
          </Flex>
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
      </Grid>
    </div>
  );
};
