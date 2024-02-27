import { Outlet } from "react-router";
import { Flex } from "@chakra-ui/react";
import InvoiceBar from "./InvoiceBar";
export default function RootLayout() {
  return (
    <Flex overflow={"hidden"}>
      <Outlet />
      <InvoiceBar />
    </Flex>
  );
}
