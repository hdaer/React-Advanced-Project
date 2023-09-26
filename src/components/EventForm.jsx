import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  Flex,
} from "@chakra-ui/react";

import { MyTimePicker } from "./ui/MyTimePicker";
import { MyDatePicker } from "./ui/MyDatePicker";

const dataFetcher = async () => {
  const events = await fetch("http://localhost:3000/events");
  const categories = await fetch("http://localhost:3000/categories");
  const users = await fetch("http://localhost:3000/users");
  return {
    users: await users.json(),
    events: await events.json(),
    categories: await categories.json(),
  };
};
const { users, categories } = await dataFetcher();

export const EventForm = ({ formState, setFormState }) => {
  const date = formState.startTime.substring(0, 10);
  const timeStart = formState.startTime.substring(11, 16);
  const timeEnd = formState.endTime.substring(11, 16);

  // date and time states in order to set these from child component with setter functions
  const [dateValue, setDateValue] = useState(date);
  const [startTimeValue, setStartTimeValue] = useState(timeStart);
  const [endTimeValue, setEndTimeValue] = useState(timeEnd);

  // category checkbox state
  const [checked, setChecked] = useState([]);

  // handle onChange events for datePicker and timePicker components
  useEffect(() => {
    setFormState({
      ...formState,
      startTime: `${dateValue}T${startTimeValue}`,
      endTime: `${dateValue}T${endTimeValue}`,
    });
  }, [dateValue, startTimeValue, endTimeValue]);

  const handleChange = (e, index) => {
    let value = "";

    //make an integer of the createdBy string
    if (e.target.name == "createdBy") {
      value = parseInt(e.target.value, 10);

      //add or remove category id from categoryIds array
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
      //regular strings inputs (title, description, location, imageURL)
    } else {
      value = e.target.value;
    }
    setFormState({
      ...formState,
      [e.target.name]: value,
    });
  };
  return (
    <FormControl>
      <Grid gap={30}>
        <GridItem>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            name="title"
            value={formState.title}
            placeholder={"title of event"}
            onChange={handleChange}
          />
        </GridItem>
        <GridItem>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formState.description}
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
            value={formState.location}
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
            timeValue={startTimeValue}
            setTimeValue={setStartTimeValue}
          />
        </GridItem>
        <GridItem>
          <FormLabel>End Time</FormLabel>
          <MyTimePicker
            name={"endTime"}
            timeValue={endTimeValue}
            setTimeValue={setEndTimeValue}
          />
        </GridItem>
        <GridItem>
          <FormLabel>Image URL</FormLabel>
          <Input
            type="text"
            name="image"
            placeholder={"paste image URL here..."}
            value={formState.image}
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
    </FormControl>
  );
};
