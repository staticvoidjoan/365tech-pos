export type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  barcode?: number;
};

export interface Invoice {
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
