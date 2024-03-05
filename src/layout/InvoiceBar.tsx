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
  useToast,
} from "@chakra-ui/react"; //Chakra ui imports
import {
  BsCash,
  BsCreditCard,
  BsCurrencyBitcoin,
  BsTrash,
  BsCart4,
} from "react-icons/bs"; //Icon imports

//Asset imports
import pos from "../assets/pos.svg";

//Utils
import { formatCurrency } from "../utlities/formatCurrency";
import axios from "axios";
import { format} from "date-fns";
import { tvshCalculator } from "../utlities/tvshCalculator";

//Context
import { useItemCart } from "../context/ItemCartContext";

//Hooks
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Product } from "../utlities/types";

//Components
import { InvoiceItem } from "../components/InvoiceItem";
import InvoiceModal from "../components/InvoiceModal";
import PaymentNumPad from "../components/PaymentNumPad";

export default function InvoiceBar({
  productsData,
}: {
  productsData: Product[];
}) {
  //Custom hoot to manage shopping cart items from cart context
  const { cartItems, emptyCart } = useItemCart();

  //Calculate the total price of items in the cart
  const totalPrice = cartItems.reduce((total, cartItem) => {
    const item = productsData.find((i) => i._id === cartItem._id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  //Setting up state variables
  const [time, setTime] = useState(new Date());
  const [faturaFinal, setFaturaFinal] = useState({});
  const finalPrice = tvshCalculator(totalPrice);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [change, setChange] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const {
    isOpen: isPrintOpen,
    onOpen: onPrintOpen,
    onClose: OnPrintClose,
  } = useDisclosure();
  const totalInvoicePrice = formatCurrency(totalPrice);
  const currentDate: Date = new Date();
  const formattedDate: string = format(currentDate, "dd MMMM yyyy");
  const formattedTime: string = format(time, "HH:mm:ss");
  const toast = useToast();
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

  //Use effect to update the time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  //Function to initiate the printing process
  const startPrinting = async () => {
    // Get the cart object from local storage
    const storedData: string | null = localStorage.getItem("items-cart");
    if (storedData === null) {
      //Handle the case where the cart is empty
      console.log("Cart is empty");
    }
    try {
      // Parse the cart object from local storage and get the product data from the server
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

        // Construct the id list of products
        const productIDs = produkte.map((product: any) => product.id);
        setProductIds(productIDs);

        const data = {
          totalPrice: totalPrice,
          tvsh: finalPrice.tvsh,
          produkte: produkte,
          subtotal: finalPrice.subtotal,
          data: formattedDate,
          ora: formattedTime,
          paymentMethod: activeButton,
        };
        setFaturaFinal(data);

        onOpen();
      } else {
        console.error("Data in local storage is not an array");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendInvoiceData = async () => {
    const faturaCloud = {
      invoiceNumber: `${formattedDate}-#${invoiceNumber}`,
      products: productIds,
      subtotal: finalPrice.subtotal,
      tvsh: finalPrice.tvsh,
      total: totalPrice,
      paymentMethod: activeButton,
      change: change,
    };

    try {
      await axios.post("http://localhost:5000/invoices", faturaCloud);
      setInvoiceNumber((currVal) => currVal + 1);
      emptyCart();
      toast({
        title: "Pagesa e sukseshme",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      toast({
        title: "Dicka shkoi keq",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
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
      <InvoiceModal
        isOpen={isPrintOpen}
        onClose={OnPrintClose}
        data={faturaFinal}
      />
      <PaymentNumPad
        isOpen={isOpen}
        onClose={onClose}
        data={faturaFinal}
        openPrint={onPrintOpen}
        setFaturaChange={setChange}
        sendInvoiceData={sendInvoiceData}
      />
      <VStack align="flex-start" marginBottom="4">
        <HStack alignItems={"center"}>
          <BsCart4 size={35} />
          <Heading as="h1" size="lg">
            Fatura #{invoiceNumber + 1}
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
            Subtotal: {formatCurrency(finalPrice.subtotal) || 0}
          </Heading>
          <Text size={"sm"} color={"gray.500"}>
            TVSH(20%): {formatCurrency(finalPrice.tvsh) || 0}
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
            Pagesë
          </Text>
          <Image src={pos} width={"8%"} />
        </Button>
      </Stack>
    </Flex>
  );
}
