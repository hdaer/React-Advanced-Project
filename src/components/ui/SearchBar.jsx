import {
  Input,
  InputRightElement,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = ({ handleReset, handleChange, handleClick }) => {
  return (
    <InputGroup maxW={"40rem"} size="md" marginTop={"0.5rem"}>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input
        pr="4.5rem"
        type="text"
        placeholder="Search event here ..."
        onChange={handleChange}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="md" onClick={handleClick} margin={"0.2rem"}>
          Search
        </Button>
        <Button
          w={"2rem"}
          h="1.75rem"
          size="md"
          onClick={handleReset}
          margin={"0.2rem"}
        >
          Reset
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
