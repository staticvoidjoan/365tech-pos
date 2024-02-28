import { Outlet, useLoaderData, useLocation } from "react-router";
import { Flex } from "@chakra-ui/react";
import InvoiceBar from "./InvoiceBar";

import { Product } from "../utlities/types";

export default function RootLayout() {
  const location = useLocation();
  const isRootPath = location.pathname === "/";
  const products = useLoaderData() as Product[];
;
  return (
    <Flex as={"main"} minH={"100vh"}>
      <Outlet />
      {isRootPath && <InvoiceBar productsData={products} />}
    </Flex>
  );
}
