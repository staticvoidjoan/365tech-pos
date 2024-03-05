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
      mb={5}
      shadow={"lg"}
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      onClick={() => setSelectedInvoice(invoice)}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
    >
      <LiaFileInvoiceDollarSolid size={100} />
      <Stack>
        <CardBody>
          <Heading size="md">{invoice.invoiceNumber}</Heading>
          <Text py="2">Total: {invoice.total}</Text>
        </CardBody>
        <CardFooter>
          <Text>{formattedData}</Text>
        </CardFooter>
      </Stack>
    </Card>
  );
}
