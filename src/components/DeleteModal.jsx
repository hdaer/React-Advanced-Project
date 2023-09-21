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
import { useNavigate, useLoaderData } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClick = async () => {
    await fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    });
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
    navigate("/");
  };

  return (
    <>
      <Button onClick={onOpen} backgroundColor={"#E55604"} color={"white"}>
        Delete Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change Event</ModalHeader>
          <ModalCloseButton />
          <Flex flexDirection={"row"} rowGap={"10px"}>
            <ModalBody>
              <span>Do you really want to delete this event?</span>
              <Button
                variant="solid"
                onClick={() => handleClick()}
                backgroundColor={"#D83F31"}
              >
                Delete
              </Button>
            </ModalBody>
          </Flex>

          <ModalFooter>
            <Button mr={3} onClick={onClose} backgroundColor={"#26577C"}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
