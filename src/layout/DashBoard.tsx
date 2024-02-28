import { SimpleGrid, Box } from "@chakra-ui/react";
// import dummyData from "../data/dummyData.json";
import ItemCard from "../components/ItemCard";
import NavBar from "./NavBar";
import { useLoaderData } from "react-router";
import { Product } from "../utlities/types";
import { useState,useEffect } from "react";
export default function DashBoard() {
  const products = useLoaderData() as Product[];
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    setProductData(products);
  }, [products]);

  return (
    <Box position="relative" flex={"2"} bg={"gray.100"}>
      <NavBar setProductData={setProductData} />
      <Box
        overflow="auto"
        height="calc(100vh - 7rem)" // Adjust this value according to your NavBar height
      >
        <SimpleGrid columns={{ md: 4, sm: 2 }} gap={"1rem"} padding={"2rem"}>
          {productData.map((item) => (
            <ItemCard key={item._id} id={item._id} {...item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
