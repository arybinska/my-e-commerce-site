import { createContext, useContext, useState } from "react";
import { ReactNode } from "react-markdown/lib/ast-to-react";

interface CartItem {
  price: number;
  title: string;
  count: number;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
}

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => {
          // const newItems = [...cartItems, item];
          // setCartItems(newItems);
          // Lub krócej:
          setCartItems((prevState) => [...prevState, item]);
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
