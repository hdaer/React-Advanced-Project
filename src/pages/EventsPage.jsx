import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Heading, Flex, Grid, GridItem } from "@chakra-ui/react";
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
  const [searchInput, setSearchInput] = useState("");
  const [searchedEvents, setSearchedEvents] = useState([]);

  const handleClick = () => {
    const searchedItems = events.filter((event) => {
      return event.title.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchedEvents(searchedItems);
  };

  // useEffect(() => {
  //   console.log(eventSearchResults);
  // }, [eventSearchResults]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleReset = () => {
    setSearchInput(() => "");
  };

  // useEffect(() => {
  //   console.log(searchInput);
  // }, [searchInput]);

  const [categoryFilter, setCategoryFilter] = useState([]);
  // const [filteredEvents, setFilteredEvents] = useState([]);

  // useEffect(() => {
  //   setFilteredEvents(() => {
  //     events.filter((event) => {
  //       return event.categoryIds.some((categoryId) => {
  //         return categoryFilter.includes(categoryId);
  //       });
  //     });
  //   });
  // }, [categoryFilter]);

  const filteredEvents = events.filter((event) => {
    return event.categoryIds.some((categoryId) => {
      return categoryFilter.includes(categoryId);
    });
  });

  const filteredAndSearchedEvents = filteredEvents.filter((x) =>
    searchedEvents.includes(x)
  );

  return (
    <div className="events-page">
      <Grid
        templateAreas={`"nav nav"
                  "side main"
                  "side footer"`}
        gridTemplateRows={"50px 1fr 30px"}
        gridTemplateColumns={"150px 1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"nav"}>
          Events
        </GridItem>
        <GridItem p="2" bg="pink.300" area={"side"}>
          Filter category
          <CategoryFilter
            categories={categories}
            setCategoryFilter={setCategoryFilter}
          />
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          <Flex justifyContent={"center"}>
            <SearchBar
              handleReset={handleReset}
              handleChange={handleChange}
              handleClick={handleClick}
            />
          </Flex>
          <Flex flexDir={"row"}>
            {searchedEvents.length !== 0 &&
              searchedEvents.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    categories={categories}
                  />
                );
              })}

            {filteredEvents.length !== 0 &&
              filteredEvents.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    categories={categories}
                  />
                );
              })}

            {searchedEvents.length === 0 &&
              filteredEvents.length === 0 &&
              events.map((event) => {
                return (
                  <EventCard
                    key={event.id}
                    event={event}
                    categories={categories}
                  />
                );
              })}

            {filteredAndSearchedEvents.length === 0 &&
              filteredAndSearchedEvents.map((event) => {
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
