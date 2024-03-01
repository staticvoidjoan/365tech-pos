import {
  SimpleGrid,
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  useToast,
  InputGroup,
  InputLeftAddon,
  Spinner,
} from "@chakra-ui/react";
// import dummyData from "../data/dummyData.json";
import axios from "axios";
import NavBar from "./NavBar";
import { useLoaderData } from "react-router";
import { Product } from "../utlities/types";
import Barcode from "react-barcode";
import { useState, useEffect } from "react";
import IneventoryItem from "../components/InventoryItem";
import { IoIosAdd } from "react-icons/io";
export default function Inventory() {
  const products = useLoaderData() as Product[];
  const toast = useToast();
  const [productData, setProductData] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    price: 100,
    description: "",
    barcode: 0o0,
  });
  useEffect(() => {
    setTimeout(() => {
      setProductData(products.slice().reverse());
      setIsLoading(false);
    }, 800);
  }, [products]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (product.name === "" || product.description === "") {
      toast({
        title: "Name and Description are required.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        product
      );
      const responseFull = await axios.get("http://localhost:5000/products");
      onClose();
      toast({
        title: "Product created.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      const reversedProducts = responseFull.data.slice().reverse();
      setProductData(reversedProducts);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box position="relative" flex={"2"} bg={"gray.100"}>
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>New Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column">
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Product Name"
                    value={product.name}
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>ALL</InputLeftAddon>
                    <Input
                      placeholder="Product Price"
                      value={product.price}
                      name="price"
                      onChange={handleChange}
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Product Description"
                    value={product.description}
                    name="description"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Barcode</FormLabel>
                  <Input
                    placeholder="Barcode"
                    value={product.barcode}
                    name="barcode"
                    onChange={handleChange}
                    minLength={12}
                    maxLength={12}
                  />
                  <Barcode
                    value={product.barcode.toString()}
                    width={1}
                    height={40}
                  />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter gap={5}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                Create Product
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <NavBar setProductData={setProductData} />
      <Box
        overflow="auto"
        height="calc(100vh - 7rem)" // Adjust this value according to your NavBar height
      >
        <Flex w={"100%"} padding={5} justifyContent={"center"}>
          <Button
            colorScheme="teal"
            onClick={onOpen}
            fontSize={"1.5rem"}
            padding={5}
          >
            <IoIosAdd size={30} />
            Add New Product
          </Button>
        </Flex>
        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal"
            size="xl"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        ) : (
          <SimpleGrid
            columns={{ md: 4, sm: 2 }}
            gap={"1rem"}
            spacing={5}
            padding={"2rem"}
          >
            {productData.map((item) => (
              <IneventoryItem
                key={item._id}
                id={item._id}
                {...item}
                setProductData={setProductData}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
