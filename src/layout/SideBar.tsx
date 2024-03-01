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
          <List fontSize={"1.5rem"} fontWeight={"400"} spacing={5} mt={5}>
            <ListItem>
              <NavLink to={"/"}>
                <Text
                  _hover={{ borderBottom: "solid 1px black" }}
                  w={"fit-content"}
                >
                  Dashboard
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/inventory"}>
                <Text
                  _hover={{ borderBottom: "solid 1px black" }}
                  w={"fit-content"}
                >
                  Inventari
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/invoices"}>
                <Text
                  _hover={{ borderBottom: "solid 1px black" }}
                  whiteSpace={"nowrap"}
                  w={"fit-content"}
                >
                  Historiku i Shitjeve
                </Text>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to={"/"}>
                <Text
                  _hover={{ borderBottom: "solid 1px black" }}
                  w={"fit-content"}
                >
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
