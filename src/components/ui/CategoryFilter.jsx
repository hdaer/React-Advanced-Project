import {
  Stack,
  Checkbox,
  CheckboxGroup,
  chakra,
  Flex,
  Text,
  Box,
  useCheckboxGroup,
  useCheckbox,
} from "@chakra-ui/react";

import { useEffect } from "react";

export const CategoryFilter = ({ categories, setFilter }) => {
  function CustomCheckbox(props) {
    const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
      useCheckbox(props);

    return (
      <chakra.label
        display="flex"
        flexDirection="row"
        alignItems="center"
        gridColumnGap={2}
        maxW="40"
        bg="green.50"
        border="1px solid"
        borderColor="green.500"
        rounded="lg"
        px={3}
        py={1}
        cursor="pointer"
        {...htmlProps}
      >
        <input {...getInputProps()} hidden />
        <Flex
          alignItems="center"
          justifyContent="center"
          border="2px solid"
          borderColor="green.500"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>
        <Text color="gray.700" {...getLabelProps()}>
          {props.name}
        </Text>
      </chakra.label>
    );
  }

  const { value, getCheckboxProps } = useCheckboxGroup();

  useEffect(() => {
    setFilter([]);
    const filteredCategories = value.map(Number).sort(function (a, b) {
      return a - b;
    });
    setFilter(filteredCategories);
    // console.log(filteredCategories);
  }, [value]);

  return (
    <CheckboxGroup colorScheme="blue">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {categories.map((category) => {
          return (
            <CustomCheckbox
              key={category.id}
              {...getCheckboxProps({ value: category.id, name: category.name })}
            />

            // <Checkbox key={category.id} value={category.name}>
            //   {category.name}
            // </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};
