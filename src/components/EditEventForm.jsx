import {
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { MyDatePicker } from "./ui/DatePicker";
import { MyTimePicker } from "./ui/TimePicker";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  });

  //   .then((res) => res.json())
  //   .then((json) => json.id);
  // return console.log(newId);
};

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

export const EditEventForm = () => {
  const { users, categories } = useLoaderData();

  return (
    <Form method="post">
      <FormControl>
        <Grid gap={30}>
          <GridItem>
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" placeholder="Title" />
          </GridItem>

          <GridItem>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" placeholder="Description" />
          </GridItem>

          <GridItem>
            <FormLabel>Category</FormLabel>
            <Select name="categoryIds" placeholder="select category">
              {categories.map((category) => (
                <option key="category.id" value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" placeholder="Location" />
          </GridItem>

          <GridItem>
            <FormLabel>Date</FormLabel>
            <MyDatePicker name="eventDate" />
          </GridItem>

          <GridItem>
            <FormLabel>Starting Time</FormLabel>
            <MyTimePicker name="startTime" />
          </GridItem>

          <GridItem>
            <FormLabel>End Time</FormLabel>
            <MyTimePicker name="endTime" />
          </GridItem>

          <GridItem>
            <FormLabel>Image URL</FormLabel>
            <Input type="text" name="image" placeholder="https://...." />
          </GridItem>
          <GridItem>
            <FormLabel>event created by ... </FormLabel>
            <Select name="createdBy" placeholder="select user">
              {users.map((user) => (
                <option key="user.id">{user.name}</option>
              ))}
            </Select>
          </GridItem>
        </Grid>
      </FormControl>
      <Button type="submit">Add Event</Button>
    </Form>
  );
};
