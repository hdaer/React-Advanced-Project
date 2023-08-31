// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Button,
// } from "@chakra-ui/react";

// import { NewEventForm } from "../utils/NewEventForm";

// export const NewEventModal = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   return (
//     <>
//       <Button onClick={onOpen}>new event byy modal</Button>

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Add Event</ModalHeader>
//           <ModalCloseButton />

//           <ModalBody>
//             <NewEventForm />
//           </ModalBody>

//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
