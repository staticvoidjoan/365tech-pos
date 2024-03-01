import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Badge,
  VStack,
  Box,
  HStack,
  Divider,
  Avatar,
} from "@chakra-ui/react";
import { formatCurrency } from "../utlities/formatCurrency";
export default function InvoiceStoryCard({ invoice }) {
  return (
    <Card maxW="md" boxShadow={"xl"} border={"3px solid black"}>
      <CardHeader>
        <Text fontSize="xl" fontWeight="bold">
          Invoice Number: {invoice.invoiceNumber}
        </Text>
        <Text fontWeight={"bold"}>Shitesi:</Text>
        <HStack mt={3} gap={5}>
          <Avatar size="sm" name="Shitesi" boxSize={"10"} />
          <Text fontWeight={"bold"}>365Tech Admin</Text>
        </HStack>
      </CardHeader>
      <CardBody pt={0}>
        <VStack
          align="start"
          mt={4}
          spacing={2}
          borderWidth="1px"
          borderRadius="md"
          maxH={"200px"}
          overflow={"auto"}
        >
          {invoice.products.map((product, index) => (
            <Box key={product._id} p={3} boxShadow={"md"}>
              <Text fontSize="lg" fontWeight="semibold">
                #{index + 1} - {product.name}
              </Text>
              <Text>{product.description}</Text>
              <Text>Price: ${product.price}</Text>
              <Text>Barcode: {product.barcode}</Text>
            </Box>
          ))}
        </VStack>
      </CardBody>
      <Divider />
      <CardFooter>
        {" "}
        <HStack mt={4} justify="space-between">
          <Box>
            <Text>Subtotal: {formatCurrency(invoice.subtotal)}</Text>
            <Text>Tax (TVSH): {formatCurrency(invoice.tvsh)}</Text>
            <Text fontWeight="bold">
              Total: {formatCurrency(invoice.total)}
            </Text>
          </Box>
          <Badge colorScheme="green">{invoice.paymentMethod}</Badge>
        </HStack>
      </CardFooter>
    </Card>
  );
}
