import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { ItemCartProvider } from "./context/ItemCartContext";
import DashBoard from "./layout/DashBoard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<DashBoard />} />
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
