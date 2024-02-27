import { Outlet, useLocation } from "react-router";
import { Flex } from "@chakra-ui/react";
import InvoiceBar from "./InvoiceBar";

export default function RootLayout() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  return (
    <Flex as={"main"} minH={"100vh"}>
      <Outlet />
      {isRootPath && <InvoiceBar />}
    </Flex>
  );
}
