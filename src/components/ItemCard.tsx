import { useItemCart } from "../context/ItemCartContext";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Stack,
  Text,
  HStack,
  Divider,
  // Flex,
} from "@chakra-ui/react";
import itemFallback from "../assets/itemFallback.svg";
import { formatCurrency } from "../utlities/formatCurrency";
// import { BsTrash } from "react-icons/bs";
// import { useState } from "react";

type ItemCardProps = {
  id: string;
  name: string;
  price: number;
};

export default function ItemCard({ id, name, price }: ItemCardProps) {
  const {
    // removeFromCart,
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useItemCart();
  // const [isHovered, setIsHovered] = useState(false);

  const quantity = getItemQuantity(id);
  return (
    <Card
      border={"2px solid #2d3748"}
      maxW={"sm"}
      borderRadius={"50px"}
      bg={"gray.100"}
      shadow={"xl"}
      m={1}
    >
      <CardBody>
        <Stack mt={4} spacing={3} alignItems={"center"}>
          <Image src={itemFallback} width={"40%"} />
          <HStack justifyContent="space-between" width={"100%"}>
            <Text fontWeight={"bold"} fontSize={"0.8rem"}>
              {name}
            </Text>
            <Text color={"gray"} fontSize={"0.8rem"}>
              {formatCurrency(price)}
            </Text>
          </HStack>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justify={"center"}>
        {quantity === 0 ? (
          <Button
            onClick={() => increaseCartQuantity(id)}
            colorScheme="teal"
            fontSize={"0.8rem"}
            size={"sm"}
          >
            Add to cart
          </Button>
        ) : (
          // <Flex alignItems={"center"} flexDir={"column"} gap={".5rem"}>
          //   <Flex alignItems={"center"} justifyContent={"center"} gap={".5rem"}>
          //     <Button
          //       onClick={() => decreaseCartQuantity(id)}
          //       colorScheme="teal"
          //       size={"sm"}
          //     >
          //       -
          //     </Button>
          //     <Text>{quantity}</Text>
          //     <Button
          //       onClick={() => increaseCartQuantity(id)}
          //       colorScheme="teal"
          //       size={"sm"}
          //     >
          //       +
          //     </Button>
          //   </Flex>
          //   <Button
          //     onClick={() => removeFromCart(id)}
          //     colorScheme="red"
          //     size={"sm"}
          //     // fontSize={".8rem"}
          //   >
          //     {/* <BsTrash size={25} /> */}
          //     {quantity}
          //   </Button>
          // </Flex>
          <HStack>
            <Button
              onClick={() => decreaseCartQuantity(id)}
              colorScheme="teal"
              size={"sm"}
            >
              -
            </Button>
            <Button
              // onClick={() => removeFromCart(id)}
              bg="white"
              color={"black"}
              shadow={"md"}
              size={"sm"}
              disabled={true}
              border={"2px solid #2d3748"}
              // onMouseEnter={() => setIsHovered(true)}
              // onMouseLeave={() => setIsHovered(false)}
              fontSize={"1.2rem"}
              maxW={"40px"}
              maxH={"40px"}
              overflow={"hidden"}
            >
              {/* <BsTrash size={25} /> */}
              {/* {isHovered ? <BsTrash size={35} /> : quantity} */}
              {quantity}
            </Button>
            <Button
              onClick={() => increaseCartQuantity(id)}
              colorScheme="teal"
              size={"sm"}
            >
              +
            </Button>
          </HStack>
        )}
      </CardFooter>
    </Card>
  );
}
