import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  HStack,
} from "@chakra-ui/react";
import QRCode from "react-qr-code";
import { formatCurrency } from "../utlities/formatCurrency";
export default function InvoiceModal({ isOpen, onClose, data }: any) {
  if (!data) return null; // Handle case where data is undefined

  const paymentType = data.paymentMethod
    ? data.paymentMethod.toUpperCase()
    : "";
  const invoiceNumber = localStorage.getItem("invoiceNumber");

  // Format data for QR code
  const formattedData = `
    Invoice #: ${invoiceNumber}
    -------------------------------------
    Product           Description           Price    Quantity    Total
    -------------------------------------
    ${
      data.produkte && Array.isArray(data.produkte)
        ? data.produkte
            .map(
              (produkt: any) => `
        ${produkt.name.padEnd(16)} ${produkt.description.padEnd(
                21
              )} ${produkt.price.toString().padEnd(9)} ${produkt.quantity
                .toString()
                .padEnd(11)} ${(produkt.price * produkt.quantity).toString()}
      `
            )
            .join("\n")
        : ""
    }
    -------------------------------------
    Subtotal: ${formatCurrency(data.subtotal || 0)}
    TVSH 20%: ${formatCurrency(data.tvsh || 0)}
    Total: ${formatCurrency(data.totalPrice || 0)}
    Date: ${data.data || ""}
    Time: ${data.ora || ""}
    Payment Method: ${paymentType}
  `;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"1000px"}>
        <ModalHeader>Fatura #{invoiceNumber}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Box maxH="300px" overflowY="auto">
              <Thead>
                <Tr>
                  <Th>Produkt</Th>
                  <Th>Përshkrimi</Th>
                  <Th>Çmimi</Th>
                  <Th>Sasia</Th>
                  <Th>Totali</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.produkte &&
                  Array.isArray(data.produkte) &&
                  data.produkte.map((produkt: any, index: number) => (
                    <Tr key={index}>
                      <Td>{produkt.name}</Td>
                      <Td>{produkt.description}</Td>
                      <Td>{produkt.price}</Td>
                      <Td>{produkt.quantity}</Td>
                      <Td>{produkt.price * produkt.quantity}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Box>
          </Table>
          <Table mt="5">
            <Tr>
              <Td fontWeight={"bold"}>Subtotali:</Td>
              <Td>{formatCurrency(data.subtotal)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>TVSH 20%:</Td>
              <Td>{formatCurrency(data.tvsh)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Totali:</Td>
              <Td>{formatCurrency(data.totalPrice)}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Data:</Td>
              <Td>{data.data}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Ora:</Td>
              <Td>{data.ora}</Td>
            </Tr>
            <Tr>
              <Td fontWeight={"bold"}>Metoda e Pagesës:</Td>
              <Td>{paymentType}</Td>
            </Tr>
          </Table>
        </ModalBody>
        <HStack justifyContent={"center"}>
          <QRCode value={formattedData} size={200} />
        </HStack>
        <ModalFooter>365TechPos.AL ©</ModalFooter>
      </ModalContent>
    </Modal>
  );
}
