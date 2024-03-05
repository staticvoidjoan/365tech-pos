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
  Spacer,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { formatCurrency } from "../utlities/formatCurrency";

import { Invoice } from "../utlities/types";

interface InvoiceStoryCardProps {
  invoice: Invoice;
}
export default function InvoiceStoryCard({ invoice }: InvoiceStoryCardProps) {
  return (
    <Card
      w="600px"
      height={"1500px"}
      boxShadow={"xl"}
      border={"3px solid black"}
      maxH="800px"
    >
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
        <HStack mt={3} gap={5} justifyContent={"flex-start"}>
          <Text fontWeight={"bold"}>Bleresi:</Text>
          <Spacer />
          <Avatar size="sm" name="Joan" boxSize={"10"} />
          <Text fontWeight={"bold"}>Joan Shameti</Text>
        </HStack>
        <VStack mt={6}>
          <QRCode value={JSON.stringify(invoice)} size={200} />
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
