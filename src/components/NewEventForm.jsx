import { useState, useEffect } from "react";

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
import { useLoaderData, useNavigate } from "react-router-dom";

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

  const todaysDate = new Date();
  const todaysTime = `${todaysDate.getHours()}:${todaysDate.getMinutes()}`;

  const [dateValue, setDateValue] = useState(todaysDate);
  const [startTime, setStartTime] = useState(todaysTime);
  const [endTime, setEndTime] = useState(todaysTime);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    const day = (dateValue.getDate() < 10 ? "0" : "") + dateValue.getDate();
    const month =
      (dateValue.getMonth() + 1 < 10 ? "0" : "") + (dateValue.getMonth() + 1);
    const year = dateValue.getFullYear();
    const newDate = `${year}-${month}-${day}`;

    setNewEventFormState({
      ...newEventFormState,
      startTime: `${newDate}T${startTime}`,
      endTime: `${newDate}T${endTime}`,
    });
  }, [dateValue, startTime, endTime]);

  const handleChange = (e, index) => {
    let value = "";

    if (e.target.name == "createdBy") {
      value = parseInt(e.target.value, 10);
    } else if (e.target.name == "categoryIds") {
      let prev = checked;
      let itemIndex = prev.indexOf(index);
      if (itemIndex !== -1) {
        prev.splice(itemIndex, 1);
      } else {
        prev.push(index);
      }

      setChecked([...prev]);

      value = checked.map((index) => index + 1).sort();
    } else {
      value = e.target.value;
    }

    setNewEventFormState({
      ...newEventFormState,
      [e.target.name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const newId = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEventFormState),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => json.id);

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
    });

    navigate(`/event/${newId}`);
  };

  return (
    <FormControl onSubmit={handleSubmit} isRequired>
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
            {categories.map((category, index) => (
              <Checkbox
                key={category.id}
                name="categoryIds"
                value={category.id}
                checked={checked.includes(index)}
                onChange={(e) => handleChange(e, index)}
              >
                {category.name}
              </Checkbox>
            ))}
          </Flex>
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

      <Button type="submit" onClick={handleSubmit}>
        Add Event
      </Button>
    </FormControl>
  );
};
