import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBar from "./SideBar";
import { useRef, useState } from "react";
// import { searchProductByName } from "./your-api-file-path"; // Update the path accordingly
import axios from "axios";
import logo from "../assets/logo.png"
import { NavLink } from "react-router-dom";
export default function NavBar({
  setProductData,
}: {
  setProductData: (products: any[]) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/productSearch?name=${searchTerm}`
      );
      if (response.data.length !== 0) {
        setProductData(response.data);
      }
    } catch (error) {
      console.error("Error searching for products:", error);
      // Handle errors appropriately
    }
  };

  return (
    <>
      <SideBar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Flex as="nav" p={5} bg={"gray.200"} gap={"5rem"}>
        <HStack>
          <NavLink to={"/"} style={{width:"70%", padding:5}} >
            <Image src={logo} />
  
          </NavLink>
          <Button ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        </HStack>

        <InputGroup maxW={"500px"} alignItems={"center"}>
          <InputLeftAddon onClick={handleSearch} style={{ cursor: "pointer" }}>
            <SearchIcon />
          </InputLeftAddon>
          <Input
            variant={"filled"}
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </InputGroup>
      </Flex>
    </>
  );
}
