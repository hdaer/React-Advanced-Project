import { useState } from "react";
import { Heading, Checkbox, Stack, Button } from "@chakra-ui/react";

export const TestPage = () => {
  const [value, setValue] = useState([]);
  const handleChange = (e) => {
    setValue(e.target.value);
    console.log(value);
  };

  const [name, setName] = useState("");
  const handleClick = () => {
    setName("John");
    console.log(name);
  };

  return (
    <div className="TestPage">
      <Heading>Test Page</Heading>
      <Stack spacing={5} direction="row">
        <Button onClick={handleClick}>click me</Button>
        <Checkbox onChange={handleChange} value={1}>
          value 1
        </Checkbox>
        <Checkbox onChange={handleChange} value={2}>
          value 2
        </Checkbox>
      </Stack>
    </div>
  );
};
