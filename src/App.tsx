import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { ItemCartProvider } from "./context/ItemCartContext";
import DashBoard from "./layout/DashBoard";
import Products from "./pages/Products";
import { Product } from "./utlities/types";
import Inventory from "./layout/Inventory";
import SalesHistory from "./layout/SalesHistory";

async function productLoader() {
  try {
    const response = await fetch("http://localhost:5000/products");
    const data: Product = await response.json();
    return data;
  } catch (error) {}
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} loader={productLoader}>
        <Route index element={<DashBoard />} loader={productLoader} />
        <Route
          path="/inventory"
          element={<Inventory />}
          loader={productLoader}
        />
        <Route path="/invoices" element={<SalesHistory />} />
        <Route path="/products" element={<Products />} />
      </Route>
    )
  );
  return (
    <ItemCartProvider>
      <RouterProvider router={router} />;
    </ItemCartProvider>
  );
}

export default App;
