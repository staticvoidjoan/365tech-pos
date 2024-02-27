import {  SimpleGrid } from "@chakra-ui/react";
import dummyData from "../data/dummyData.json";
import ItemCard from "../components/ItemCard";
export default function DashBoard() {
  return (
    <SimpleGrid columns={{ md: 4, sm: 2 }} gap={"1rem"} padding={"2rem"} maxH={"100vh"} overflow={"auto"}>
      {dummyData.map((item) => (
        <ItemCard key={item.id} {...item} />
      ))}
    </SimpleGrid>
  );
}
