import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Spinner,
  Center,
  Flex,
  Heading,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import InvoiceStoryCard from "../components/InvoiceStoryCard";
import InvoiceSideBarCard from "../components/InvoiceSideBarCard";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  barcode: number;
}

interface Invoice {
  _id: string;
  invoiceNumber: string;
  products: Product[];
  subtotal: number;
  tvsh: number;
  total: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const InvoiceItem: React.FC = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>(
          "http://localhost:5000/invoices"
        );
        console.log("Fetched invoices:", response.data); // Log fetched data
        setInvoices(response.data);
        setSelectedInvoice(response.data[0]);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }


  return (
    <Box w={"100%"}>
      <NavBar setProductData={function (products: any[]): void {
        throw new Error("Function not implemented.");
      } } />
      <Flex width={"100%"} height={"calc(100vh - 7rem)"}>
        <Box overflowY="auto" maxHeight="100vh" w={"100%"} flex={1} padding={5}>
          <Heading>Historiku i Faturave</Heading>
          {invoices.map((invoice, index) => (
            <InvoiceSideBarCard
              invoice={invoice}
              key={index}
              setSelectedInvoice={setSelectedInvoice}
            />
          ))}
        </Box>
        <Flex
          flex={2}
          justifyContent={"center"}
          alignContent={"center"}
          alignItems={"center"}
        >
          <InvoiceStoryCard invoice={selectedInvoice as Invoice} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default InvoiceItem;
