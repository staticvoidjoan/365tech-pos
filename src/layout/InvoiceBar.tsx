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
  Badge,
} from "@chakra-ui/react";
import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
// import dummyData from "../data/dummyData.json";
import { InvoiceItem } from "../components/InvoiceItem";
import {
  BsCash,
  BsCreditCard,
  BsCurrencyBitcoin,
  BsTrash,
  BsCart4,
} from "react-icons/bs";
import { format } from "date-fns";
import pos from "../assets/pos.svg";
import { Product } from "../utlities/types";
import { useEffect, useState } from "react";
import { tvshCalculator } from "../utlities/tvshCalculator";

export default function InvoiceBar({
  productsData,
}: {
  productsData: Product[];
}) {
  const { cartItems, emptyCart } = useItemCart();
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = productsData.find((i) => i._id === cartItem._id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
  const [time, setTime] = useState(new Date());
  const finalPrice = tvshCalculator(totalPrice);

  const totalInvoicePrice = formatCurrency(totalPrice, "ALL");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  const currentDate: Date = new Date();
  const formattedDate: string = format(currentDate, "dd MMMM yyyy");
  const formattedTime: string = format(time, "HH:mm:ss");

  const [activeButton, setActiveButton] = useState<string | null>(null);
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

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
        <HStack alignItems={"center"}>
          <BsCart4 size={35} />
          <Heading as="h1" size="lg">
            Fatura #1
          </Heading>
        </HStack>
        <HStack>
          <Text fontSize="1.5rem" fontWeight={"bold"}>
            {formattedDate}
          </Text>
          <Badge variant="outline" colorScheme="green" fontSize={"1rem"}>
            {formattedTime}
          </Badge>
  
        </HStack>
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
        {cartItems.map((item, index) => (
          <InvoiceItem
            key={`${item._id}-${index}`}
            id={item._id}
            {...item}
            productData={productsData}
          />
        ))}
      </Stack>
      <Spacer />
      <Button
        colorScheme="red"
        height={"fit-content"}
        padding={3}
        borderRadius={20}
        onClick={() => emptyCart()}
        gap={3}
      >
        Empty Cart
        <BsTrash size={34} />
      </Button>
      <Stack>
        <Stack bg={"gray"} color={"white"} padding={5} borderRadius={"2rem"}>
          <Heading>Total: {totalInvoicePrice}</Heading>
          <Heading size={"sm"}>
            Subtotal: {formatCurrency(finalPrice.subtotal, "ALL") || 0}
          </Heading>
          <Text size={"sm"} color={"gray.300"}>
            TVSH(20%): {formatCurrency(finalPrice.tvsh, "ALL") || 0}
          </Text>
          <Heading size={"md"}>Pagesa:</Heading>
          <HStack justifyContent={"center"} gap={5}>
            <Button
              colorScheme={activeButton === "cash" ? "teal" : "gray"}
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
              onClick={() => handleButtonClick("cash")}
            >
              <BsCash style={{ width: "4rem", height: "4rem" }} />
            </Button>
            <Button
              colorScheme={activeButton === "creditCard" ? "teal" : "gray"}
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
              onClick={() => handleButtonClick("creditCard")}
            >
              <BsCreditCard style={{ width: "4rem", height: "4rem" }} />
            </Button>
            <Button
              colorScheme={activeButton === "crypto" ? "teal" : "gray"}
              width={"5rem"}
              height={"5rem"}
              borderRadius={"1rem"}
              onClick={() => handleButtonClick("crypto")}
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
