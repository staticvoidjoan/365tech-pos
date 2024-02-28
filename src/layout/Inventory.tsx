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
} from "@chakra-ui/react";
// import dummyData from "../data/dummyData.json";
import axios from "axios";
import NavBar from "./NavBar";
import { useLoaderData } from "react-router";
import { Product } from "../utlities/types";
import { useState, useEffect } from "react";
import IneventoryItem from "../components/InventoryItem";
export default function Inventory() {
  const products = useLoaderData() as Product[];
  const toast = useToast();
  const [productData, setProductData] = useState<Product[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });
  useEffect(() => {
    setProductData(products.slice().reverse());
  }, [products]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(product);
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
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <Input
                    placeholder="Product Price"
                    value={product.price}
                    name="price"
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Product Description"
                    value={product.description}
                    name="description"
                    onChange={handleChange}
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
          <Button colorScheme="teal" onClick={onOpen}>
            Add New Product
          </Button>
        </Flex>
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
      </Box>
    </Box>
  );
}
