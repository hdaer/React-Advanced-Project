import {
  Input,
  InputRightElement,
  Button,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

import { Search2Icon } from "@chakra-ui/icons";
import { useState } from "react";

export const SearchBar = ({ handleReset, handleChange, handleClick }) => {
  return (
    <InputGroup size="md">
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
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          Search
        </Button>
        <Button h="1.75rem" size="sm" onClick={handleReset}>
          Reset
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
