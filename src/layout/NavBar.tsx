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
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.png";

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
  const navigate = useNavigate();
  const isSaleHistory = location.pathname === "/invoices";
  const isHomeHistory = location.pathname === "/";
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

  const navigateHome = () => {
    navigate("/");
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
          <Image
            src={logo}
            w={isHomeHistory ? "70%" : "50%"} 
            onClick={navigateHome}
            cursor={"pointer"}
          />

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
            width={"90px"}
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
