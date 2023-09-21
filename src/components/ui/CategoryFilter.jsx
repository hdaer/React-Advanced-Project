import {
  CheckboxGroup,
  chakra,
  Flex,
  Text,
  Box,
  useCheckboxGroup,
  useCheckbox,
} from "@chakra-ui/react";

import { useEffect } from "react";

export const CategoryFilter = ({ events, categories, setFilteredEvents }) => {
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
        bg="#E2E8F0"
        border="1px solid"
        borderColor="#26577C"
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
          borderColor="#26577C"
          w={4}
          h={4}
          {...getCheckboxProps()}
        >
          {state.isChecked && <Box w={2} h={2} bg="green.500" />}
        </Flex>

        <Text color="#26577C" {...getLabelProps()}>
          {props.name}
        </Text>
      </chakra.label>
    );
  }

  const { value, getCheckboxProps } = useCheckboxGroup();

  // const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    const filteredCategories = value.map(Number).sort(function (a, b) {
      return a - b;
    });

    const filteredEventsByCategory = events.filter((event) => {
      return event.categoryIds.some((categoryId) => {
        return filteredCategories.includes(categoryId);
      });
    });
    setFilteredEvents(filteredEventsByCategory);
  }, [value]);

  return (
    <CheckboxGroup colorScheme="blue">
      <Flex
        justifyContent={"center"}
        flexDirection={"column"}
        gap={"0.5rem"}
        margin={"0.2rem"}
      >
        {categories.map((category) => {
          return (
            <CustomCheckbox
              key={category.id}
              {...getCheckboxProps({ value: category.id, name: category.name })}
            />
          );
        })}
      </Flex>
    </CheckboxGroup>
  );
};
