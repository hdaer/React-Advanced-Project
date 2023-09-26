import {
  Input,
  InputRightElement,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = ({ setSearchInput, handleClick }) => {
  return (
    <InputGroup maxW={"40rem"} size="md" margin={"0.5rem 0 0.5rem"}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="#26577C" />
      </InputLeftElement>
      <Input
        pr="4.5rem"
        type="text"
        _hover={{ borderColor: "#BB2525" }}
        borderColor={{ opacity: 0.5, color: "#26577C" }}
        placeholder="Search title of event here ..."
        _placeholder={{ opacity: 0.5, color: "#26577C" }}
        onChange={(e) => {
          setSearchInput(() => "");
          setSearchInput(e.target.value);
        }}
      />
      <InputRightElement width="4.5rem">
        <Button h="2rem" w="4rem" size="md" onClick={handleClick}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
