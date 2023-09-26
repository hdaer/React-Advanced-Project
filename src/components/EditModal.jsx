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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { EventForm } from "./EventForm";

export const EditModal = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [changedEventForm, setChangedEventForm] = useState({
    title: event.title,
    description: event.description,
    categoryIds: event.categoryIds,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
    image: event.image,
    createdBy: event.createdBy,
  });

  const handleSubmit = async () => {
    await fetch(`http://localhost:3000/events/${event.id}`, {
      method: "PUT",
      body: JSON.stringify(changedEventForm),
      headers: { "Content-Type": "application/json" },
    });

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
          Event Editted
        </Box>
      ),
    });

    navigate(`/event/${event.id}`);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"#26577C"} color={"white"}>
        Edit Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <EventForm
              formState={changedEventForm}
              setFormState={setChangedEventForm}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Edit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
