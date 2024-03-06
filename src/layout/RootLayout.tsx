import { Outlet, useLoaderData, useLocation } from "react-router";
import { Flex } from "@chakra-ui/react";
import InvoiceBar from "./InvoiceBar";

import { Product } from "../utlities/types";
import ScreenLock from "./ScreenLock";

export default function RootLayout() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const products = useLoaderData() as Product[];
  return (
    <Flex as={"main"} minH={"100vh"}>
      {/* <ScreenLock /> */}
      <Outlet />
      {isRootPath && <InvoiceBar productsData={products} />}
    </Flex>
  );
}
