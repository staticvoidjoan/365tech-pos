import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  SimpleGrid,
  VStack,
  Box,
  HStack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Spacer,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { formatCurrency } from "../utlities/formatCurrency";
import { FaLongArrowAltLeft } from "react-icons/fa";
const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const specialChars = ["Backspace", "Enter", "Escape", "Delete"];
import { FatureData } from "../utlities/types";

interface PaymentNumPadProps {
  onClose: () => void;
  isOpen: boolean;
  data: FatureData;
  openPrint: () => void;
  setFaturaChange: (change: number) => void;
  sendInvoiceData: () => void;
}

export default function PaymentNumPad({
  onClose,
  isOpen,
  data,
  openPrint,
  setFaturaChange,
  sendInvoiceData,
}: PaymentNumPadProps) {
  const [amount, setAmount] = useState(""); // State to keep track of the input amount
  const [change, setChange] = useState<number>(0); // State to keep track of the change
  const handleNumClick = (num: number) => {
    setAmount((prevAmount) => prevAmount + num); // Concatenate the clicked number to the existing amount
  };

  useEffect(() => {
    setChange(0);
  }, []);

  const toast = useToast();

  const handleClear = () => {
    setAmount(""); // Clear the amount
    setChange(0); // Clear the change
  };

  const calculateChange = () => {
    const inputAmount = parseFloat(amount);
    const changeAmount = inputAmount - data.totalPrice;

    setChange(changeAmount || 0);
    setFaturaChange(changeAmount);
  };
  useEffect(() => {
    calculateChange();
  }, [amount]);

  useEffect(() => {
    const handleKeyPress = (event: { key: any }) => {
      const { key } = event;
      if ([...nums, "0"].includes(key)) {
        handleNumClick(key);
      } else if (specialChars.includes(key)) {
        switch (key) {
          case "Backspace":
            setAmount((prevAmount) => prevAmount.slice(0, -1));
            break;
          case "Enter":
            handlePay();
            break;
          case "Escape":
          case "Delete":
            handleClear();
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [amount]);

  const handlePay = () => {
    if (change <= 0 && isOpen) {
      toast({
        title: "Vlera e pamjaftueshme",
        description: "Vlera e vendosur nuk mjafton per te kryer pagesen!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else if (change > 0 && isOpen) {
      sendInvoiceData();
      onClose();
      openPrint();
      setChange(0);
      setAmount("");
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"1000px"}>
          <ModalHeader>Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack gap={5}>
              <VStack alignItems={"center"}>
                <SimpleGrid columns={3} gap={"3"}>
                  {nums.map((num) => (
                    <Button
                      key={num}
                      w={"150px"}
                      height={"150px"}
                      onClick={() => handleNumClick(parseFloat(num))}
                      colorScheme="teal"
                    >
                      <Heading>{num}</Heading>
                    </Button>
                  ))}
                  <Button
                    w={"150px"}
                    height={"150px"}
                    onClick={handleClear}
                    colorScheme="red"
                  >
                    <Heading>C</Heading>
                  </Button>
                  <Button
                    w={"150px"}
                    height={"150px"}
                    onClick={() => handleNumClick(0)}
                    colorScheme="teal"
                  >
                    <Heading>0</Heading>
                  </Button>
                  <Button
                    w={"150px"}
                    height={"150px"}
                    onClick={() =>
                      setAmount((prevAmount) => prevAmount.slice(0, -1))
                    }
                    colorScheme="red"
                  >
                    <FaLongArrowAltLeft size={35} />
                  </Button>
                </SimpleGrid>
              </VStack>
              <VStack
                flex={"2"}
                justifyContent={"space-between"}
                height={"100%"}
                gap={3}
              >
                <Table variant="simple" border={"4px solid #319795"}>
                  <Box maxH="300px" overflowY="auto">
                    <Thead>
                      <Tr>
                        <Th>Produkt</Th>
                        <Th>Çmimi</Th>
                        <Th>Sasia</Th>
                        <Th>Totali</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data.produkte &&
                        Array.isArray(data.produkte) &&
                        data.produkte.map((produkt: any, index: number) => (
                          <Tr key={index}>
                            <Td>{produkt.name}</Td>

                            <Td>{produkt.price}</Td>
                            <Td>{produkt.quantity}</Td>
                            <Td>{produkt.price * produkt.quantity}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Box>
                </Table>
                <Spacer />
                <Heading>
                  Total:
                  <span style={{ color: "teal" }}>{data.totalPrice}</span>{" "}
                </Heading>
                <Heading size={"sm"}>
                  Subtotal: {formatCurrency(data.subtotal) || 0}
                </Heading>
                <Text size={"sm"} color={"gray.500"}>
                  TVSH(20%): {formatCurrency(data.tvsh) || 0}
                </Text>
                <Box
                  border={"4px solid #319795"}
                  shadow={"lg"}
                  w={"100%"}
                  height={"100px"}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="2xl"
                  flexDir={"column"}
                  maxW={"400px"}
                  overflow={"hidden"}
                >
                  <HStack maxW={"380px"} overflow={"hidden"}>
                    <Text>Pagesa:</Text>
                    <Text fontWeight={"600"}>
                      {formatCurrency(parseFloat(amount) || 0)}
                    </Text>
                  </HStack>
                  <HStack maxW={"380px"} overflow={"hidden"}>
                    <Text>Kusuri:</Text>
                    <Text
                      color={change <= 0 ? "red" : "green"}
                      fontWeight={"600"}
                    >
                      {formatCurrency(change)}
                    </Text>
                  </HStack>
                </Box>
                <HStack justifyContent={"space-evenly"} width={"100%"}>
                  <Avatar name="365" bg={"black"} color={"white"} />
                  <Text>
                    <strong>Shitesi: </strong>365Tech Admin{" "}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Box>
              <Button colorScheme="teal" mr={3} size={"lg"} onClick={handlePay}>
                Pay
              </Button>
              <Button onClick={handleClear} size={"lg"}>
                Clear
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
