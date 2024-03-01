import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { formatCurrency } from "../utlities/formatCurrency";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSIze: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  content: {
    fontSize: 12,
  },
});

interface InvoiceData {
  totalPrice: number;
  tvsh: number;
  subtotal: number;
  produkte: [];
  formattedDate: string;
  formattedTime: string;
  activeButton: string;
}

export const InvoiceGenerator = (data: InvoiceData) => {
  <PDFViewer style={{ width: "100%", height: "100vh" }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Invoice</Text>
          <View style={styles.content}>
            <Text>Total Price: {formatCurrency(data.totalPrice, "ALL")}</Text>
            <Text>TVSH: {formatCurrency(data.tvsh, "ALL")}</Text>
            <Text>{data.produkte}</Text>
            <Text>
              Subtotal: {formatCurrency(data.subtotal, "ALL")}
            </Text>
            <Text>Date: {data.formattedDate}</Text>
            <Text>Time: {data.formattedTime}</Text>
            <Text>Payment Method: {data.activeButton}</Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>;
};
