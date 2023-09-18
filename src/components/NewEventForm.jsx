import { useState, useEffect } from "react";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";

import {
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Box,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import { redirect, useLoaderData } from "react-router-dom";

import { MyTimePicker } from "./ui/MyTimePicker";
import { MyDatePicker } from "./ui/MyDatePicker";

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

export const NewEventForm = () => {
  const { users, categories } = useLoaderData();
  const toast = useToast();

  const [newEventFormState, setNewEventFormState] = useState({
    title: "",
    description: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
    image: "",
    createdBy: null,
  });

  const [dateValue, setDateValue] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  // useEffect(() => {
  //   console.log("hello");
  // });Effect(() => {
  //   console.log("hello");
  // });

  useEffect(() => {
    const day = dateValue.getDate();
    const month = dateValue.getMonth() + 1;
    const year = dateValue.getFullYear();
    const newDate = `${year}-${month}-${day}`;

    setNewEventFormState({
      ...newEventFormState,
      startTime: `${newDate}T${startTime}`,
    });
    setNewEventFormState({
      ...newEventFormState,
      startTime: `${newDate}T${endTime}`,
    });

    console.log(newEventFormState);
  }, [dateValue, startTime, endTime]);

  const handleChange = (e) => {
    let value = null;

    if (e.target.name == "createdBy") {
      value = parseInt(e.target.value, 10);
    }

    // if (e.target.name == "categoryIds") {
    //   value = [...[], e.target.value];
    // }

    setNewEventFormState({
      ...newEventFormState,
      [e.target.name]: value,
    });
    // console.log(newEventFormState);
    // console.log(newEventFormState.title);
  };

  const handleSubmit = async () => {
    const newId = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEventFormState),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => json.id);

    // return redirect(`/newevent`);
    return redirect(`/event/${newId}`);
  };

  return (
    <FormControl onSubmit={handleSubmit}>
      <Grid gap={30}>
        <GridItem>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={newEventFormState.title}
            placeholder={"title of event"}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            // value={newEventFormState.description}
            placeholder={"description of event"}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem>
          <FormLabel>Category</FormLabel>

          <Flex
            justifyContent={"left"}
            flexDirection={"row"}
            gap={"0.5rem"}
            margin={"0.2rem"}
          >
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                name="categoryIds"
                value={category.id}
                onChange={handleChange}
              >
                {category.name}
              </Checkbox>
            ))}
          </Flex>

          {/* <Select name="categoryIds" placeholder="select category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select> */}
        </GridItem>

        <GridItem>
          <FormLabel>Location</FormLabel>
          <Input
            type="text"
            name="location"
            placeholder={"location of event"}
            value={newEventFormState.location}
            onChange={handleChange}
          />
        </GridItem>

        <GridItem>
          <FormLabel>Date</FormLabel>
          <MyDatePicker
            name="date"
            dateValue={dateValue}
            setDateValue={setDateValue}
          />
        </GridItem>

        <GridItem>
          <FormLabel>Starting Time</FormLabel>
          <MyTimePicker
            name={"startTime"}
            timeValue={startTime}
            setTimeValue={setStartTime}
          />
        </GridItem>

        <GridItem>
          <FormLabel>End Time</FormLabel>
          <MyTimePicker
            name={"endTime"}
            timeValue={endTime}
            setTimeValue={setEndTime}
          />
        </GridItem>

        <GridItem>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="text"
            name="image"
            placeholder={"paste image URL here..."}
            value={newEventFormState.image}
            onChange={handleChange}
          />
        </GridItem>
        <GridItem>
          <FormLabel>event created by ... </FormLabel>
          <Select
            name="createdBy"
            onChange={handleChange}
            placeholder="select user"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </Select>
        </GridItem>
      </Grid>

      <Button
        type="submit"
        onClick={() =>
          toast({
            position: "bottom",
            render: () => (
              <Box
                textAlign="center"
                fontSize="25"
                fontWeight="bold"
                color="white"
                p={3}
                bg="blue.500"
                borderRadius="20px"
              >
                Event Created
              </Box>
            ),
          })
        }
      >
        Add Event
      </Button>
    </FormControl>
  );
};
