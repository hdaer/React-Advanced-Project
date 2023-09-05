import { Stack, Checkbox, CheckboxGroup } from "@chakra-ui/react";

export const CategoryFilter = ({ categories }) => {
  return (
    <CheckboxGroup colorScheme="blue">
      <Stack spacing={[1, 5]} direction={["column", "row"]}>
        {categories.map((category) => {
          return (
            <Checkbox key={category.id} value={category.name}>
              {category.name}
            </Checkbox>
          );
        })}
      </Stack>
    </CheckboxGroup>
  );
};
