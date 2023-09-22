import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const DeleteModal = ({ eventId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    navigate("/");
  };

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"#E55604"} color={"white"}>
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent textAlign={"center"}>
          <ModalHeader>Delete Event</ModalHeader>
          <ModalCloseButton />
          <Flex flexDirection={"row"} rowGap={"10px"}>
            <ModalBody>
              <span>Are you sure you want to delete this event?</span>
            </ModalBody>
          </Flex>

          <ModalFooter display={"flex"} justifyContent={"space-around"}>
            <Button
              variant="solid"
              onClick={() => handleClick()}
              backgroundColor={"#E55604"}
              color={"white"}
            >
              Delete
            </Button>
            <Button
              mr={3}
              onClick={onClose}
              backgroundColor={"#26577C"}
              color={"white"}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
