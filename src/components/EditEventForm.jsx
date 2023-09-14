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
} from "@chakra-ui/react";
import { Form, redirect, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { MyDatePicker } from "./ui/DatePicker";
import { MyTimePicker } from "./ui/TimePicker";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());

  // const newEventFormData = {
  //   title: formData.title,
  //   description: formData.description,
  //   categoryIds: [Number(formData.categoryIds)],
  //   location: formData.location,
  //   startTime: `${formData.date}T${formData.startTime}`,
  //   endTime: `${formData.date}T${formData.endTime}`,
  //   image: formData.image,
  //   createdBy: Number(formData.createdBy),
  // };

  // const newId = await fetch("http://localhost:3000/events", {
  //   method: "PATCH",
  //   body: JSON.stringify(newEventFormData),
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then((res) => res.json())
  //   .then((json) => json.id);

  // // return redirect(`/newevent`);
  // return redirect(`/event/${newId}`);
};

// export const action = async ({ request }) => {
//   const formData = Object.fromEntries(await request.formData());
//   const newId = await fetch("http://localhost:3000/events", {
//     method: "PATCH",
//     body: JSON.stringify(formData),
//     headers: { "Content-Type": "application/json" },
//   });

//   //   .then((res) => res.json())
//   //   .then((json) => json.id);
//   // return console.log(newId);
// };

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
  const { events, users, categories } = useLoaderData();
  const params = useParams();
  const toast = useToast();

  const [title, setTitle] = useState();

  console.log(title);

  const event = events.filter((event) => {
    return event.id == params.eventId;
  })[0];

  return (
    <Form method="put">
      <FormControl>
        <Grid gap={30}>
          <GridItem>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder={event.title}
            />
          </GridItem>

          {/* <GridItem>
            <FormLabel>Description</FormLabel>
            <Input
              type="text"
              name="description"
              placeholder={event.description}
            />
          </GridItem>

          <GridItem>
            <FormLabel>Category</FormLabel>
            <Select name="categoryIds" placeholder="select category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </GridItem>

          <GridItem>
            <FormLabel>Location</FormLabel>
            <Input type="text" name="location" placeholder={event.location} />
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
            <Input type="text" name="image" placeholder={event.image} />
          </GridItem>
          <GridItem>
            <FormLabel>event created by ... </FormLabel>
            <Select name="createdBy" placeholder="select user">
              {users.map((user) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </Select>
          </GridItem> */}
        </Grid>
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
                Event Edited
              </Box>
            ),
          })
        }
      >
        Edit Event
      </Button>
    </Form>
  );
};
