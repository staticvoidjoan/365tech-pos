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
  useDisclosure,
} from "@chakra-ui/react";
import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
// import dummyData from "../data/dummyData.json";
import axios from "axios";
import { InvoiceItem } from "../components/InvoiceItem";
import {
  BsCash,
  BsCreditCard,
  BsCurrencyBitcoin,
  BsTrash,
  BsCart4,
} from "react-icons/bs";
import { format, sub } from "date-fns";
import pos from "../assets/pos.svg";
import { Product } from "../utlities/types";
import { useEffect, useState } from "react";
import { tvshCalculator } from "../utlities/tvshCalculator";
import InvoiceModal from "../components/InvoiceModal";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const [faturaFinal, setFaturaFinal] = useState({});
  // const [produktet, setProduktet] = useState([]);
  const finalPrice = tvshCalculator(totalPrice);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  const [invoiceNumber, setInvoiceNumber] = useLocalStorage<number>(
    "invoiceNumber",
    1
  );
  const [activeButton, setActiveButton] = useState<string | null>("cash");
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName === activeButton ? null : buttonName);
  };

  //Use effect to reset the invoice number on a daily basis
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = format(currentDate, "yyyy-MM-dd");
    const storedDate = localStorage.getItem("resetDate");
    if (!storedDate || storedDate !== formattedDate) {
      setInvoiceNumber(0);
      localStorage.setItem("resetDate", formattedDate);
    }
  }, []);

  const startPrinting = async () => {
    const storedData: string | null = localStorage.getItem("items-cart");
    if (storedData === null) {
      console.log("Cart is empty");
    }
    try {
      const fatura: any = JSON.parse(storedData as string);
      if (Array.isArray(fatura)) {
        const arrayofIds: string[] = fatura.map((obj: any) => obj._id);
        const response = await axios.get(
          `http://localhost:5000/getProductsByIds?ids=${arrayofIds.join(",")}`
        );

        // setProduktet(response.data);
        const fetchedProducts = response.data;
        // Construct the produkte array with product data
        const produkte = fetchedProducts.map((product: any) => ({
          id: product._id,
          name: product.name,
          description: product.description,
          barcode: product.barcode,
          price: product.price,
          quantity: fatura.find((item: any) => item._id === product._id)
            .quantity,
        }));
        const productIDs = produkte.map((product: any) => product.id);

        const data = {
          totalPrice: totalPrice,
          tvsh: finalPrice.tvsh,
          produkte: produkte,
          subtotal: finalPrice.subtotal,
          data: formattedDate,
          ora: formattedTime,
          paymentMethod: activeButton,
        };
        console.log(data);

        const faturaCloud = {
          invoiceNumber: `${formattedDate}-${invoiceNumber}`,
          products: productIDs,
          subtotal: finalPrice.subtotal,
          tvsh: finalPrice.tvsh,
          total: totalPrice,
          paymentMethod: activeButton,
        };
        console.log(faturaCloud);
        const responseCloud = await axios.post(
          "http://localhost:5000/invoices",
          faturaCloud
        );
        console.log(responseCloud);

        setFaturaFinal(data);
        setInvoiceNumber((currVal) => currVal + 1);
        onOpen();
        emptyCart();
      } else {
        console.error("Data in local storage is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      flex={1}
      overflow={"auto"}
      bg={"gray.200"}
      p={5}
      flexDir={"column"}
      justifyContent={"flex-start"}
      maxH={"100vh"}
      gap={5}
    >
      <InvoiceModal isOpen={isOpen} onClose={onClose} data={faturaFinal} />
      <VStack align="flex-start" marginBottom="4">
        <HStack alignItems={"center"}>
          <BsCart4 size={35} />
          <Heading as="h1" size="lg">
            Fatura #{invoiceNumber}
          </Heading>
        </HStack>
        <HStack>
          <Text fontSize="1.5rem" fontWeight={"bold"}>
            {formattedDate}
          </Text>
          <Badge
            variant="outline"
            colorScheme="green"
            fontSize={"1rem"}
            borderRadius={"8px"}
            px={2}
          >
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
        <Stack
          bg={"gray.300"}
          boxShadow={"xl"}
          color={"white"}
          padding={5}
          mb={5}
          borderRadius={"2rem"}
        >
          <Heading>
            Total:<span style={{ color: "teal" }}>{totalInvoicePrice}</span>{" "}
          </Heading>
          <Heading size={"sm"}>
            Subtotal: {formatCurrency(finalPrice.subtotal, "ALL") || 0}
          </Heading>
          <Text size={"sm"} color={"gray.500"}>
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
          colorScheme="teal"
          gap={"1rem"}
          onClick={startPrinting}
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
