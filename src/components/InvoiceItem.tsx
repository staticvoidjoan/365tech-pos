import { useItemCart } from "../context/ItemCartContext";
import { formatCurrency } from "../utlities/formatCurrency";
import {
  Button,
  Image,
  Box,
  Text,
  HStack,
  Flex,
  Input,
} from "@chakra-ui/react";
import itemFallback from "../assets/itemFallback.svg";
import Transition from "../Transition";
import { Product } from "../utlities/types";
import { useState } from "react";
import { BsPencil, BsTrash } from "react-icons/bs";
import { IoIosCheckmark } from "react-icons/io";
type InvoiceItemProps = {
  id: string;
  quantity: number;
  productData: Product[];
};

export function InvoiceItem({ id, quantity, productData }: InvoiceItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { removeFromCart, setCartQuantity } = useItemCart();
  const [amount, setAmount] = useState(quantity);
  const item = productData.find((i) => i._id === id);
  if (item == null) {
    return null;
  }

  function handleEditClick() {
    setAmount(quantity);
    setIsEditing((editing) => !editing);
  }
  function setNewAmount() {
    setIsEditing((editing) => !editing);
    setCartQuantity(id, amount);
  }

  let editableQuantity = (
    <HStack cursor={"pointer"} onClick={handleEditClick}>
      <Text fontSize="sm" color="gray.500">
        x {quantity}
      </Text>
      <BsPencil />
    </HStack>
  );

  if (isEditing) {
    editableQuantity = (
      <HStack>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          maxW={"60px"}
          maxH={"30px"}
          border={"1px solid black"}
          _hover={{ border: "1px solid black" }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setNewAmount();
            }
          }}
        />
        <IoIosCheckmark size={35} onClick={setNewAmount} cursor={"pointer"} />
      </HStack>
    );
  }

  const totalPrice = item.price * quantity;
  return (
    <Transition>
      <Box
        border="2px solid #2d3748"
        borderRadius="1.5rem"
        padding={5}
        marginBottom="2"
        display="flex"
        alignItems="center"
      >
        <Image
          src={itemFallback}
          boxSize="65px"
          borderRadius="md"
          marginRight="4"
        />

        <Flex flex="1" justifyContent="space-between" alignItems="center">
          <Box>
            <HStack>
              <Text fontSize="md" fontWeight="bold">
                {item.name}
              </Text>
              {quantity >= 1 && editableQuantity}
            </HStack>
            <Text fontSize="sm">{formatCurrency(item.price)}</Text>
            <Text fontSize="md" fontWeight="bold">
              {formatCurrency(totalPrice)}
            </Text>
          </Box>

          <Button
            onClick={() => removeFromCart(id)}
            colorScheme="red"
            size="sm"
          >
            <BsTrash size={20} />
          </Button>
        </Flex>
      </Box>
    </Transition>
  );
}
