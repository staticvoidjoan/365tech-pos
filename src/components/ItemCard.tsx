import { useItemCart } from "../context/ItemCartContext";
import {
  Card,
  //   CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  //   Heading,
  Stack,
  Text,
  HStack,
  Divider,
  Flex,
} from "@chakra-ui/react";
import itemFallback from "../assets/itemFallback.svg";
import { formatCurrency } from "../utlities/formatCurrency";

type ItemCardProps = {
  id: number;
  name: string;
  price: number;
};

export default function ItemCard({ id, name, price }: ItemCardProps) {
  const {
    removeFromCart,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useItemCart();
  const quantity = getItemQuantity(id);
  return (
    <Card maxW={"sm"}>
      <CardBody>
        <Stack mt={6} spacing={3} alignItems={"center"}>
          <Image src={itemFallback} width={"50%"} />
          <HStack alignContent={"space-between"}>
            <Text fontWeight={"bold"}>{name}</Text>
            <Text color={"gray"}>{formatCurrency(price, "ALL")}</Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justify={"center"}>
        {quantity === 0 ? (
          <Button onClick={() => increaseCartQuantity(id)} colorScheme="teal">
            Add to cart
          </Button>
        ) : (
          <Flex alignItems={"center"} flexDir={"column"} gap={".5rem"}>
            <Flex alignItems={"center"} justifyContent={"center"} gap={".5rem"}>
              <Button
                onClick={() => decreaseCartQuantity(id)}
                colorScheme="teal"
              >
                -
              </Button>
              <Text>{quantity}</Text>
              <Button
                onClick={() => increaseCartQuantity(id)}
                colorScheme="teal"
              >
                +
              </Button>
            </Flex>
            <Button onClick={() => removeFromCart(id)} colorScheme="red">Remove</Button>
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
}
