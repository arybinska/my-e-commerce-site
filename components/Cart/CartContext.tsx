import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react-markdown/lib/ast-to-react";

interface CartItem {
  readonly id: string;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: readonly CartItem[] | undefined;
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

  const getCartItemsFromStorage = () => {
    const itemsFromLocalStorage = localStorage.getItem("E_COMMERCE_APP_CART");
    if (!itemsFromLocalStorage) {
      return [];
    }
    try {
      const items = JSON.parse(itemsFromLocalStorage);
      return items;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const setCartItemsInStorage = (cartItems: CartItem[] | undefined) => {
    localStorage.setItem("E_COMMERCE_APP_CART", JSON.stringify(cartItems));
  };
  //klucz: "E_COMMERCE_APP_CART" - musi być unikalny
  //1. odczytać z localstorage
  // -> jeśli coś tam jest to ustawić 'cartItem'
  //2. Gdy się coś zmieni to zapisać do localstorage

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []); //tylko raz na początku

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    setCartItemsInStorage(cartItems);
  }, [cartItems]); // gdy zmieni się cartItems

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems || [],
        addItemToCart: (item) => {
          // const newItems = [...cartItems, item];
          // setCartItems(newItems);
          // Lub krócej:
          setCartItems((prevState = []) => {
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              return existingItem.id === item.id
                ? { ...existingItem, count: existingItem.count + 1 }
                : existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevState = []) => {
            const existingItem = prevState.find((el) => el.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((el) => el.id !== id);
            }
            return prevState.map((el) => {
              return el.id === id ? { ...el, count: el.count - 1 } : el;
            });
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

//Tworzymy swój hook
export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider");
  }
  return cartState;
};
