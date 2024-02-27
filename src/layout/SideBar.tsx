import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
export default function SideBar({
  isOpen,
  onClose,
  btnRef,
}: {
  isOpen: any;
  onClose: any;
  btnRef: any;
}) {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>365Tech.POS</DrawerHeader>
        <DrawerBody gap={"2rem"}>
          <NavLink to={"/"}>
            <Heading>Dashboard</Heading>
          </NavLink>
          <NavLink to={"/products"}>
            <Heading>Produkte</Heading>
          </NavLink>
        </DrawerBody>
        <DrawerFooter justifyContent={"space-between"}>
          <Avatar></Avatar>
          <Text>365tech@gmail.com</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
