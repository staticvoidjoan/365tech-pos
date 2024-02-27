import { Box, Button, Stack, Flex } from "@chakra-ui/react";
import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
import dummyData from "../data/dummyData.json";
import { InvoiceItem } from "../components/InvoiceItem";
export default function InvoiceBar() {
  const { cartItems } = useItemCart();

  return (
    <Flex flex={2} overflow={"auto"} bg={"gray.300"} p={5} flexDir={"column"} justifyContent={"space-between"} maxH={"100vh"}>
      <Stack gap={3} overflow={"auto"}>
        {cartItems.map((item) => (
          <InvoiceItem key={item.id} {...item} />
        ))}
      </Stack>
      <Button width={"100%"} colorScheme="green">
        Printo
      </Button>
    </Flex>
  );
}
