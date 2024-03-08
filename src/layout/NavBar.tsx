import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
  Select,
  Spacer,
} from "@chakra-ui/react";
import { MdCurrencyExchange } from "react-icons/md";
import { SearchIcon } from "@chakra-ui/icons";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBar from "./SideBar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
// import { searchProductByName } from "./your-api-file-path"; // Update the path accordingly
import axios from "axios";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
export default function NavBar({
  setProductData,
}: {
  setProductData: (products: any[]) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    localStorage.getItem("selectedCurrency") || "ALL"
  );
  const location = useLocation();
  const isSaleHistory = location.pathname === "/invoices";
  useEffect(() => {
    localStorage.setItem("selectedCurrency", selectedCurrency);
  }, [selectedCurrency]);

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
      <Flex
        as="nav"
        p={5}
        bg={"gray.200"}
        gap={"5rem"}
        alignItems={"center"}
        maxH={"100px"}
      >
        <HStack>
          <NavLink to={"/"} style={{ width: "70%", padding: 5 }}>
            <Image src={logo} />
          </NavLink>
          <Button ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </Button>
        </HStack>
        {isSaleHistory ? null : (
          <InputGroup maxW={"500px"} alignItems={"center"}>
            <InputLeftAddon
              onClick={handleSearch}
              style={{ cursor: "pointer" }}
            >
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
        )}
        <Spacer />
        <HStack>
          <MdCurrencyExchange size={35} />
          <Select
            color={"black"}
            // maxW={"180px"}
            value={selectedCurrency}
            variant={"filled"}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </Select>
        </HStack>
      </Flex>
    </>
  );
}
