export type Product = {
  _id: string;
  name: string;
  price: number;
  description?: string;
  barcode?: number;
  quantity?: number;
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


export interface FatureData {
  totalPrice: number;
  tvsh: number;
  produkte: Product[];
  subtotal: number;
  data: string;
  ora: string;
  paymentMethod: string | null;
}