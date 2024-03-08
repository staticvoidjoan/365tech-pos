import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Box as="footer" bg="black" color="white" p={4} mt={8} height={"100%"} width={"100%"}>
      <Text textAlign="center">© 2024 365Tech POS. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
