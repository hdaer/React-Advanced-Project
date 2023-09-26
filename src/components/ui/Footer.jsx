import { Flex, Link, Image } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Flex
      h={"5vh"}
      w="100%"
      p="2"
      bg="#B4B4B3"
      color={"#26577C"}
      fontWeight="bold"
      justifyContent={"flex-end"}
      alignItems={"center"}
    >
      <Link href={"https://www.wincacademy.nl/"} target="_blank">
        <Image src="../../../favicon/favicon-16x16.png" />
      </Link>
    </Flex>
  );
};
