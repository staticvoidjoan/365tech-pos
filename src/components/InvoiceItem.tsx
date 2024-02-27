import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
import dummyData from "../data/dummyData.json";
import { Stack, Button, Image, Box, Text } from "@chakra-ui/react";
import itemFallback from "../assets/itemFallback.svg";
type InvoiceItemProps = {
  id: number;
  quantity: number;
};

export function InvoiceItem({ id, quantity }: InvoiceItemProps) {
  const { removeFromCart } = useItemCart();
  const item = dummyData.find((i) => i.id === id);
  if (item == null) {
    return null;
  }

  return (
    <Stack dir="horizontal" gap={2} alignItems={"center"}>
      <Image
        src={itemFallback}
        width={"20%"}
      />
      <Box marginEnd={"auto"}>
        <Box>
          {item.name}
          {quantity > 1 && (
            <Text fontSize={".65rem"} color={"gray"}>
              x {quantity}
            </Text>
          )}
          <Text>{formatCurrency(item.price, "ALL")}</Text>
        </Box>
      </Box>
    </Stack>
  );
}
