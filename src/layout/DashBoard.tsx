import { SimpleGrid, Box } from "@chakra-ui/react";
// import dummyData from "../data/dummyData.json";
import ItemCard from "../components/ItemCard";
import NavBar from "./NavBar";
import { useLoaderData } from "react-router";
import { Product } from "../utlities/types";
import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
export default function DashBoard() {
  const products = useLoaderData() as Product[];
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setProductData(products);
      setIsLoading(false); // Set loading to false once data is loaded
    }, 1000); // Adjust the loading time as needed
  }, [products]);

  return (
    <Box position="relative" flex={"2"} bg={"#fbfbfb"}>
      <NavBar setProductData={setProductData} />
      <Box
        overflow="auto"
        height="calc(100vh - 7rem)" // Adjust this value according to your NavBar height
      >
        {loading ? ( // Show spinner while loading
      
          <HashLoader
            color="#319795"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
            size={150}
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
