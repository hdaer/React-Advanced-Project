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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventForm } from "./EventForm";

export const EditModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const [changedEventForm, setChangedEventForm] = useState({
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
      method: "PATCH",
      body: JSON.stringify(changedEventForm),
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
          Event Editted
        </Box>
      ),
    });

    // navigate(`/event/${newId}`);
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
