import { Outlet } from "react-router";
import { Box } from "@chakra-ui/react";
export default function RootLayout() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}
