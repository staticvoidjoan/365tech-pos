import {
  Text,
  Card,
  Stack,
  CardBody,
  CardFooter,
  Heading,
} from "@chakra-ui/react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { format } from "date-fns";
import { Invoice } from "../utlities/types";
import { formatCurrency } from "../utlities/formatCurrency";
interface InvoiceSideBarCardProps {
  invoice: Invoice;
  setSelectedInvoice: (invoice: Invoice | null) => void;
}
export default function InvoiceSideBarCard({
  invoice,
  setSelectedInvoice,
}: InvoiceSideBarCardProps) {
  const formattedData = format(new Date(invoice.createdAt), "dd/MM/yyyy HH:mm");

  return (
    <Card
      maxW={"md"}
      mb={5}
      shadow={"lg"}
      direction={{ base: "column", sm: "row" }}
      border={"1px solid black"}
      overflow="hidden"
      variant="outline"
      onClick={() => setSelectedInvoice(invoice)}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
    >
      <Stack justify={"center"}>
        <LiaFileInvoiceDollarSolid size={50} />
      </Stack>

      <CardBody>
        <Heading size="sm">{invoice.invoiceNumber}</Heading>
        <Text py="2"><strong>Total:</strong> {formatCurrency(invoice.total)}</Text>
      </CardBody>
      <CardFooter>
        <Text>{formattedData}</Text>
      </CardFooter>
    </Card>
  );
}
