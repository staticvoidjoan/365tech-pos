import {
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBar from "./SideBar";
import { useRef } from "react";
export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>();
  return (
    <>
      <SideBar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex as="nav" p={5} bg={"gray.300"} gap={"5rem"}>
        <HStack>
          <Heading>365Tech.POS</Heading>
          <Button ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        </HStack>

        <InputGroup maxW={"500px"}>
          <InputLeftAddon>
            <SearchIcon />
          </InputLeftAddon>
          <Input type="tel" placeholder="Search" />
        </InputGroup>
      </Flex>
    </>
  );
}
