import { Product } from "./types";

export async function productLoader() {
  try {
    const response = await fetch("http://localhost:5000/products");
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const response = await fetch(`http://localhost:5000/products/${id}`);
    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

export async function searchProductByName(name: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/products/search?name=${name}`
    );
    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching for products with name ${name}:`, error);
    throw error;
  }
}
