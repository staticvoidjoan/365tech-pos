import { SimpleGrid, Box } from "@chakra-ui/react";
import dummyData from "../data/dummyData.json";
import ItemCard from "../components/ItemCard";
import NavBar from "./NavBar";

export default function DashBoard() {
  return (
    <Box position="relative" flex={"2"} bg={"gray.100"}>
      <NavBar />
      <Box
        overflow="auto"
        height="calc(100vh - 7rem)" // Adjust this value according to your NavBar height
      >
        <SimpleGrid columns={{ md: 4, sm: 2 }} gap={"1rem"} padding={"2rem"}>
          {dummyData.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
