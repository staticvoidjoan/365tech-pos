import { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
//Define the type for a single item in the cart

type CartItem = {
  id: number;
  quantity: number;
};

//Define the type for the ItemCartContext
type ItemCartContextType = {
  getItemQuantity: (id: number) => number; //Function to get the quantity of a specific item in the cart
  increaseCartQuantity: (id: number) => void; //Function to increase the quantity of a specific item in the cart
  decreaseCartQuantity: (id: number) => void; //Function to decrease the quantity of a specific item in the cart
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

//Create a context for our item cart functionality
const ItemCartContext = createContext({} as ItemCartContextType);

//Custom hook to access the shopping cart context throughout the app
export function useItemCart() {
  return useContext(ItemCartContext);
}

//Props for the ItemCartProvider props
type ItemCartProviderProps = {
  children: React.ReactNode;
};

export function ItemCartProvider({ children }: ItemCartProviderProps) {
  //State to manage cart items
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "items-cart",
    []
  );

  //Function to get the item quantity
  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0; //Check if an item with the id exist if yes return the quantity otherwise return 0;
  }

  //Function to increase the quantity of a specific item in the cart
  function increaseCartQuantity(id: number) {
    // console.log("Increasing cart quantity")
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        //If the item is not already in the cart, add it with the quantity of 1
        return [...currentItems, { id, quantity: 1 }];
      } else {
        //Map through all the items and check
        return currentItems.map((item) => {
          if (item.id === id) {
            //If the id matches, create a new item object and increase the quantity by 1
            return { ...item, quantity: item.quantity + 1 };
          } else {
            //If the id does not match, return the item as is
            return item;
          }
        });
      }
    });
  }

  //Function to increase the quantity of a specific item in the cart
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      //Check if the item with the given id exists in the cart and if its quantity is 1
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        //If the quantity is 1, remove the item from the cart
        return currentItems.filter((item) => item.id !== id);
      } else {
        //Map through all the items and check
        return currentItems.map((item) => {
          if (item.id === id) {
            //If the id matches, create a new item object and decrease the quantity by 1
            return { ...item, quantity: item.quantity - 1 };
          } else {
            //If the id does not match, return the item as is
            return item;
          }
        });
      }
    });
  }

  //Function to remove a specific item from the cart
  function removeFromCart(id: number) {
    //Update the cart items using the setCartItems
    setCartItems((currentItem) => currentItem.filter((item) => item.id !== id));
  }

  //Calculate the total quantity of items in the cart
  const cartQuantity = cartItems.reduce(
    //Use the reduce method to iterate over each item in the cartItems array
    (quantity, item) =>
      //Add the quantity of the current item to the accumulator quantity
      item.quantity + quantity,
    0 //Start with the initial value of 0
  );
  return (
    <ItemCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        cartItems,
        cartQuantity,
        removeFromCart,
      }}
    >
      {children}
    </ItemCartContext.Provider>
  );
}
