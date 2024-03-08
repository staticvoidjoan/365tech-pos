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
import QRCode from "react-qr-code";
import { formatCurrency } from "../utlities/formatCurrency";

import { Invoice } from "../utlities/types";

interface InvoiceStoryCardProps {
  invoice: Invoice;
}
export default function InvoiceStoryCard({ invoice }: InvoiceStoryCardProps) {
  return (
    <Card maxW={"md"} border={"3px solid black"}>
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
      <CardBody>
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
            <Box key={product._id} p={3} boxShadow={"md"} maxHeight={"md"}>
              <Text fontSize="md" fontWeight="semibold">
                #{index + 1} - {product.name}
              </Text>
              <Text fontSize={"sm"}>{product.description}</Text>
              <Text fontSize={"sm"}>Price: ${product.price}</Text>
              <Text fontSize={"sm"}>Barcode: {product.barcode}</Text>
            </Box>
          ))}
        </VStack>
        <HStack width={"100%"} justifyContent={"space-around"} mt={5}>
          <VStack align={"left"}>
            <Text fontWeight={"bold"} fontSize={"md"}>
              Bleresi:
            </Text>
            <HStack>
              <Avatar size="sm" name="Joan" boxSize={"7"} />
              <Text fontWeight={"bold"}>Joan Shameti</Text>
            </HStack>
          </VStack>

          <QRCode value={JSON.stringify(invoice)} size={100} />
        </HStack>
      </CardBody>
      <Divider />
      <CardFooter>
        {" "}
        <HStack mt={4} justify="space-between">
          <Box fontSize={"sm"}>
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
