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
import { redirect, useLoaderData } from "react-router-dom";

// export const action = async () => {
//   const handleClick = (eventId) => {
//     fetch(`http://localhost:3000/events/${eventId}`, {
//       method: "DELETE",
//     });
//     //   .then((res) => res.json())
//     //   .then((res) => console.log(res));

//     return redirect(`/`);
//   };
// };

export const DeleteModal = ({ eventId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));

    return redirect(`/`);
  };

  return (
    <>
      <Button onClick={onOpen}>Delete Event</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Event</ModalHeader>
          <ModalCloseButton />
          <Flex flexDirection={"row"} rowGap={"10px"}>
            <ModalBody>
              <span>Do you really want to delete this event?</span>
              <Button variant="solid" onClick={handleClick}>
                Delete
              </Button>
            </ModalBody>
          </Flex>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
