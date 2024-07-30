import { useState, useCallback } from "react";
import { IMatchStats } from "../types";

export const useLocalStorage = (key: string, initialValue: IMatchStats[]) => {
  const [storedValue, setStoredValue] = useState<IMatchStats[]>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const getItems = useCallback(() => {
    return storedValue;
  }, [storedValue]);

  const setItem = useCallback(
    (item: IMatchStats) => {
      try {
        const updatedItems = [item, ...storedValue];
        setStoredValue(updatedItems);
        window.localStorage.setItem(key, JSON.stringify(updatedItems));
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue]
  );

  const removeItemById = useCallback(
    (itemId: string) => {
      try {
        const updatedItems = storedValue.filter((item) => item.id !== itemId);
        setStoredValue(updatedItems);
        window.localStorage.setItem(key, JSON.stringify(updatedItems));
      } catch (error) {
        console.log(error);
      }
    },
    [key, storedValue]
  );

  const removeAllItems = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue([]);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return { getItems, setItem, removeItemById, removeAllItems };
};
