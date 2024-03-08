import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Avatar,
  Text,
  List,
  ListItem,
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
  const hoverEffect = { borderBottom: "solid 1px #2d3748" };
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
        <DrawerHeader>365Tech POS</DrawerHeader>
        <DrawerBody gap={"2rem"}>
          <List fontSize={"1.2rem"} fontWeight={"400"} spacing={5} mt={5}>
            <ListItem>
              <NavLink to={"/"}>
                <Text _hover={hoverEffect} w={"fit-content"}>
                  Dashboard
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/inventory"}>
                <Text _hover={hoverEffect} w={"fit-content"}>
                  Inventari
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/invoices"}>
                <Text
                  _hover={hoverEffect}
                  whiteSpace={"nowrap"}
                  w={"fit-content"}
                >
                  Historiku i Shitjeve
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/"}>
                <Text _hover={hoverEffect} w={"fit-content"}>
                  Klientet
                </Text>
              </NavLink>
            </ListItem>
          </List>
        </DrawerBody>
        <DrawerFooter justifyContent={"space-between"}>
          <Avatar name="shitesi" bg={"black"}></Avatar>
          <Text>365tech@gmail.com</Text>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
