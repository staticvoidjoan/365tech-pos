import {
  Text,
  Button,
  Stack,
  Flex,
  Heading,
  HStack,
  VStack,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
import dummyData from "../data/dummyData.json";
import { InvoiceItem } from "../components/InvoiceItem";
import { BsCash, BsCreditCard, BsCurrencyBitcoin } from "react-icons/bs";
import { format } from "date-fns";
import pos from "../assets/pos.svg";
export default function InvoiceBar() {
  const { cartItems } = useItemCart();
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = dummyData.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const tvshRate = 20;

  // Calculate TVSH
  const tvsh = totalPrice - totalPrice / (1 + tvshRate / 100);

  // Calculate Subtotal
  const subtotal = totalPrice - tvsh;

  // Format total invoice price
  const totalInvoicePrice = formatCurrency(totalPrice, "ALL");

  const currentDate: Date = new Date();

  const formattedDate: string = format(currentDate, "dd MMMM yyyy");
  const formattedTime: string = format(currentDate, "HH:mm");

  return (
    <Flex
      flex={1}
      overflow={"auto"}
      bg={"gray.300"}
      p={5}
      flexDir={"column"}
      justifyContent={"flex-start"}
      maxH={"100vh"}
      gap={5}
    >
      <VStack align="flex-start" marginBottom="4">
        <Heading as="h1" size="lg" marginBottom="2">
          Fatura #1
        </Heading>
        <Text fontSize="md">{formattedDate}</Text>
        <Text fontSize="md">{formattedTime}</Text>
      </VStack>
      <Stack
        gap={3}
        overflow={"auto"}
        p={10}
        border={"3px solid #2D3748"}
        // border={`${cartItems.length === 0 ? "3px solid #2D3748" : "none"}`}
        height={"100%"}
        borderRadius={"1rem"}
      >
        {cartItems.map((item) => (
          <InvoiceItem key={item.id} {...item} />
        ))}
      </Stack>
      <Spacer />
      <Stack>
        <Stack bg={"gray"} color={"white"} padding={5} borderRadius={"2rem"}>
          <Heading>Total: {totalInvoicePrice}</Heading>
          <Heading size={"sm"}>
            Subtotal: {formatCurrency(subtotal, "ALL") || 0}
          </Heading>
          <Text size={"sm"} color={"gray.300"}>
            TVSH(20%): {formatCurrency(tvsh, "ALL") || 0}
          </Text>
          <Heading size={"md"}>Pagesa:</Heading>
          <HStack justifyContent={"center"} gap={5}>
            <Button
              colorScheme="teal"
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
            >
              <BsCash style={{ width: "4rem", height: "4rem" }} />
            </Button>
            <Button
              colorScheme="teal"
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
            >
              <BsCreditCard style={{ width: "4rem", height: "4rem" }} />
            </Button>
            <Button
              colorScheme="teal"
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
            >
              <BsCurrencyBitcoin style={{ width: "4rem", height: "4rem" }} />
            </Button>
          </HStack>
        </Stack>
        <Button
          width={"100%"}
          height="5rem"
          borderRadius={"1rem"}
          colorScheme="green"
          gap={"1rem"}
        >
          <Text fontSize={"1.8rem"} fontWeight={"bold"}>
            Printo
          </Text>
          <Image src={pos} width={"8%"} />
        </Button>
      </Stack>
    </Flex>
  );
}
