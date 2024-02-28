// import { useItemCart } from "../context/ItemCartContext";
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
} from "@chakra-ui/react";
import axios from "axios";
import itemFallback from "../assets/itemFallback.svg";
import { formatCurrency } from "../utlities/formatCurrency";
import { BsTrash } from "react-icons/bs";
type ItemCardProps = {
  id: string;
  name: string;
  price: number;
  setProductData: any;
};

export default function IneventoryItem({
  id,
  name,
  price,
  setProductData,
}: ItemCardProps) {
  const deleteProduct = async () => {
    try {
      console.log(id);
      const repsonse = await axios.delete(
        `http://localhost:5000/productdelete/${id}`
      );
      console.log(repsonse);
      const newData = await axios.get("http://localhost:5000/products");
      setProductData(newData.data.slice().reverse());
    } catch (error) {
      console.log(error);
    }
  };
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
        <Button colorScheme="red" onClick={deleteProduct}>
          <BsTrash size={30} />
        </Button>
      </CardFooter>
    </Card>
  );
}
