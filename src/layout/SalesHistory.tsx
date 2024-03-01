import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Spinner,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import InvoiceStoryCard from "../components/InvoiceStoryCard";

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

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get<Invoice[]>(
          "http://localhost:5000/invoices"
        );
        console.log("Fetched invoices:", response.data); // Log fetched data
        setInvoices(response.data);
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
    <Box position="relative" flex={"2"} bg={"#fbfbfb"}>
      <NavBar />

      <SimpleGrid columns={{ md: 4, sm: 2 }} gap={"1rem"} padding={"2rem"}>
        {invoices.map((invoice) => (
          <InvoiceStoryCard key={invoice._id} invoice={invoice} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default InvoiceItem;
