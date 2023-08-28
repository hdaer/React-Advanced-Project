import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

import Button from "@mui/material/Button";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export const NewEventForm = () => {
  return (
    <>
      <Button variant="contained">Hello world</Button>;
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input type="text" placeholder="Title" />
        <FormLabel>Description</FormLabel>
        <Input type="text" placeholder="Description" />
        <FormLabel>Location</FormLabel>
        <Input type="text" placeholder="Location" />
        <FormLabel>Date</FormLabel>
        <DateTimePicker label="Basic date time picker" />
        <Input type="text" placeholder="yyyy-mm-dd" />
        <FormLabel>Starting Time</FormLabel>
        <Input type="text" placeholder="Title" />
        <FormLabel>End Time</FormLabel>
        <Input type="text" placeholder="Title" />
        <FormLabel>Upload Image</FormLabel>
        <Input type="text" placeholder="Title" />
      </FormControl>
    </>
  );
};
