import { useEffect, useState } from "react";
//Custom React hook for handling local storage with generic type support
export function useLocalStorage<T>(
  //The key used to identify the local storage entry
  key: string,
  //Initial value for the local storage entry, can be either a static value or a function
  initialValue: T | (() => T)
) {
  //State to manage current value retrieved from local storage
  const [value, setValue] = useState<T>(() => {
    //Attempt to retrieve the value from local storage based on the provided key
    const jsonValue = localStorage.getItem(key);
    //If the initial value is a function ,parse and return it
    if (jsonValue != null) return JSON.parse(jsonValue);

    //If the initial value is a function , execute it and return the result
    if (typeof initialValue === "function") {
      return initialValue as () => T;
    } else {
      //Otherwise return the initial value
      return initialValue;
    }
  });

  //SIde effect to update local storage whenever the key or value changes
  useEffect(() => {
    //Save the current value to local storage as a JSON string
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  //Return an array containing the current value and the function to update it.
  return [value, setValue] as [typeof value, typeof setValue];
}
