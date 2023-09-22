import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useToast,
  Box,
  Flex,
  Grid,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventForm } from "./EventForm";

export const NewEventModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [newEventForm, setNewEventForm] = useState({
    title: "",
    description: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
    image: "",
    createdBy: null,
  });

  const handleSubmit = async () => {
    const newId = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEventForm),
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
          bg="#26577C"
          borderRadius="20px"
        >
          Event Created
        </Box>
      ),
    });

    navigate(`/event/${newId}`);
  };

  return (
    <Flex height="100%" justifyContent={"flex-end"} alignItems="center">
      <Button
        onClick={onOpen}
        color={"#26577C"}
        justifyContent="flex-end"
        margin={"0.5rem 1rem"}
      >
        Add Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <EventForm
              formState={newEventForm}
              setFormState={setNewEventForm}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Add Event
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
