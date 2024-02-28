import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
// import dummyData from "../data/dummyData.json";
import { Button, Image, Box, Text, HStack, Flex } from "@chakra-ui/react";
import itemFallback from "../assets/itemFallback.svg";
import Transition from "../Transition";
import { Product } from "../utlities/types";

type InvoiceItemProps = {
  id: string;
  quantity: number;
  productData: Product[];
};

export function InvoiceItem({ id, quantity, productData }: InvoiceItemProps) {
  const { removeFromCart } = useItemCart();
  const item = productData.find((i) => i._id === id);
  if (item == null) {
    return null;
  }
  const totalPrice = item.price * quantity;
  return (
    <Transition>
      <Box
        border="1px solid #2D3748"
        borderRadius="md"
        padding={5}
        marginBottom="2"
        display="flex"
        alignItems="center"
      >
        <Image
          src={itemFallback}
          boxSize="80px"
          borderRadius="md"
          marginRight="4"
        />

        <Flex flex="1" justifyContent="space-between" alignItems="center">
          <Box>
            <HStack>
              <Text fontSize="lg" fontWeight="bold">
                {item.name}
              </Text>
              {quantity >= 1 && (
                <Text fontSize="sm" color="gray.500">
                  x {quantity}
                </Text>
              )}
            </HStack>
            <Text fontSize="md">{formatCurrency(item.price, "ALL")}</Text>
            <Text fontSize="lg" fontWeight="bold">
              {formatCurrency(totalPrice, "ALL")}
            </Text>
          </Box>

          <Button
            onClick={() => removeFromCart(id)}
            colorScheme="red"
            size="sm"
          >
            Remove
          </Button>
        </Flex>
      </Box>
    </Transition>
  );
}
