import { SimpleGrid, Box, Spinner } from "@chakra-ui/react";
// import dummyData from "../data/dummyData.json";
import ItemCard from "../components/ItemCard";
import NavBar from "./NavBar";
import { useLoaderData } from "react-router";
import { Product } from "../utlities/types";
import { useState, useEffect } from "react";
export default function DashBoard() {
  const products = useLoaderData() as Product[];
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setProductData(products);
      setIsLoading(false); // Set loading to false once data is loaded
    }, 500); // Adjust the loading time as needed
  }, [products]);

  return (
    <Box position="relative" flex={"2"} bg={"#fbfbfb"}>
      <NavBar setProductData={setProductData} />
      <Box
        overflow="auto"
        height="calc(100vh - 7rem)" // Adjust this value according to your NavBar height
      >
        {loading ? ( // Show spinner while loading
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="teal"
            size="xl"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        ) : (
          <SimpleGrid columns={{ md: 4, sm: 2 }} gap={"1rem"} padding={"2rem"}>
            {productData.map((item) => (
              <ItemCard key={item._id} id={item._id} {...item} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
