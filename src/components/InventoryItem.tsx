import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Box,
  Text,
  HStack,
  Divider,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import itemFallback from "../assets/itemFallback.svg";
import { formatCurrency } from "../utlities/formatCurrency";
import { BsTrash } from "react-icons/bs";
import Barcode from "react-barcode";
import { BsPencil } from "react-icons/bs";
type ItemCardProps = {
  id: string;
  name: string;
  price: number;
  description?: string;
  barcode?: number;
  setProductData: any;
};

export default function IneventoryItem({
  id,
  name,
  price,
  description,
  barcode,
  setProductData,
}: ItemCardProps) {
  const deleteProduct = async () => {
    try {
      const repsonse = await axios.delete(
        `http://localhost:5000/productdelete/${id}`
      );
      console.log(repsonse);
      const newData = await axios.get("http://localhost:5000/products");
      setProductData(newData.data.slice().reverse());
    } catch (error) {
      console.log(error);
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Popover>
        <PopoverContent boxShadow={"4px 4px 15px black"}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader fontWeight={"bold"} fontSize={"1.5rem"}>
            Confirmation!
          </PopoverHeader>
          <PopoverBody>
            <VStack>
              <Text>Are you sure you want to delete this product?</Text>
              <Button colorScheme="red" onClick={deleteProduct}>
                Delete
              </Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
        <Card boxShadow="md" borderRadius="lg" overflow="hidden">
          <HStack justifyContent={"center"}>
            <Image
              src={itemFallback}
              alt={name}
              width="30%"
              maxHeight="200px"
            />
          </HStack>
          <CardBody>
            <Box textAlign="center" mb={2}>
              <Text fontWeight="bold" fontSize="lg">
                {name}
              </Text>
              <Text color="gray.600">{description}</Text>
            </Box>
            <Divider />
            <HStack justify="space-between" mt={3}>
              <Text fontSize="lg" fontWeight={"bold"}>
                {formatCurrency(price)}
              </Text>
              {barcode && (
                <Barcode value={barcode.toString()} width={1} height={40} />
              )}
            </HStack>

            <Divider />
          </CardBody>
          <CardFooter justifyContent="center">
            <Spacer />
            <Button colorScheme="teal" size={"lg"} gap={3} onClick={onOpen}>
              Edit
              <BsPencil size={24} />
            </Button>
            <Spacer />
            <PopoverTrigger>
              <Button
                colorScheme="red"
                //  onClick={deleteProduct}
                size="lg"
              >
                <BsTrash size={24} />
              </Button>
            </PopoverTrigger>
          </CardFooter>
        </Card>
      </Popover>

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
                    value={name}
                    name="name"
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Price</FormLabel>
                  <InputGroup>
                    <InputLeftAddon>ALL</InputLeftAddon>
                    <Input
                      placeholder="Product Price"
                      value={price}
                      name="price"
                      required
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <FormLabel>Description</FormLabel>
                  <Input
                    placeholder="Product Description"
                    value={description}
                    name="description"
                    required
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Barcode</FormLabel>
                  <Input
                    placeholder="Barcode"
                    value={barcode ?? ''}
                    name="barcode"
                    minLength={12}
                    maxLength={12}
                  />
                  <Barcode value={barcode?.toString() ?? ''} width={1} height={40} />
                </FormControl>
              </Flex>
            </ModalBody>

            <ModalFooter gap={5}>
              <Button colorScheme="teal">Create Product</Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
}
