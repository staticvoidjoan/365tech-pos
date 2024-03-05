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
  Heading,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function ScreenLock() {
  const [pin, setPin] = useState(""); // State to keep track of the PIN code
  const { onClose } = useDisclosure();
  const handleNumClick = (num: Number) => {
    if (pin.length < 4) {
      setPin((prevPin) => prevPin + num); // Concatenate the clicked number to the existing PIN code
    }
  };
  const [isOpen, setIsOpen] = useState(true);
  const toast = useToast();

  const handleClear = () => {
    setPin(""); // Clear the PIN code
  };

  useEffect(() => {
    if (pin.length === 4 && pin === "1111") {
      toast({
        title: "Successfully logged in!",
        status: "success",
        duration: 3000,
        position: "top",
        isClosable: true,
      });
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [pin, toast]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"700px"}>
          <ModalHeader display="flex" justifyContent={"center"}>
            <Heading>Set PIN Code</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack alignItems={"center"} justifyContent={"center"}>
              <Box mb={4}>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Box
                    key={index}
                    w={"30px"}
                    h={"30px"}
                    bg={pin.length > index ? "teal" : "gray.200"}
                    borderRadius="full"
                    display="inline-block"
                    mx={1}
                  />
                ))}
              </Box>
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
                  onClick={() => setPin((prevPin) => prevPin.slice(0, -1))}
                  colorScheme="red"
                >
                  <FaLongArrowAltLeft size={35} />
                </Button>
              </SimpleGrid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            {/* You can add more components here if needed */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
