import {
  Heading,
  Button,
  Select,
  Flex,
  FormLabel,
  FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";
import { Form, redirect, useLoaderData } from "react-router-dom";
import { MyDatePicker } from "../components/ui/DatePicker";
import { MyTimePicker } from "../components/ui/TimePicker";
import { useState } from "react";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  const newEventFormData = {
    createdBy: Number(formData.createdBy),
    title: formData.title,
    description: formData.description,
    image: formData.image,
    categoryIds: [Number(formData.categoryIds)],
    location: formData.location,
    startTime: `${formData.date}T${formData.startTime}`,
    endTime: `${formData.date}T${formData.endTime}`,
  };

  console.log(newEventFormData);

  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(newEventFormData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);

  return redirect(`/newevent`);
  // return redirect(`/event/${newId}`);
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

export const NewEventPage = () => {
  const { users, categories } = useLoaderData();
  const toast = useToast();
  return (
    <Flex>
      <Form method="post">
        <FormControl>
          <Heading>New Event</Heading>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" placeholder="Title" />

          <FormLabel>Description</FormLabel>
          <Input type="text" name="description" placeholder="Description" />

          <FormLabel>Category</FormLabel>

          <Select
            type="number"
            name="categoryIds"
            placeholder="select category"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>

          <FormLabel>Location</FormLabel>
          <Input type="text" name="location" placeholder="Location" />

          <FormLabel>Date</FormLabel>

          <MyDatePicker name="date" />

          <FormLabel>Starting Time</FormLabel>
          <MyTimePicker name="startTime" />

          <FormLabel>End Time</FormLabel>
          <MyTimePicker name="endTime" />

          <FormLabel>Image URL</FormLabel>
          <Input type="text" name="image" placeholder="https://...." />

          <FormLabel>event created by ... </FormLabel>
          <Select name="createdBy" placeholder="select user">
            {users.map((user) => (
              <option key={user.id} value={[user.id]}>
                {user.name}
              </option>
            ))}
          </Select>
        </FormControl>
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
                  bg="green.500"
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
      </Form>
    </Flex>
  );
};
