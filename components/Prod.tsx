import Link from "next/link";
import Image from "next/future/image";
import { formatMoney } from "../pages/api/formatMoney";
import { useCartState } from "./Cart/CartContext";

interface ProductProps {
  href: string;
  name: string;
  price: string;
  variants: string;
  thumbnailUrl: string;
  id: string;
}

export const Prod = ({
  href,
  name,
  price,
  id,
  thumbnailUrl,
  variants,
}: ProductProps) => {
  const cartState = useCartState();
  return (
      <div className="relative">
        <Image
          alt="Trainer"
          src={thumbnailUrl}
          sizes="100vw"
          width={300}
          height={300}
          className="h-96 w-full object-contain"
        />

      <Link href={`/products/${href}`}>
        <a href="">
          <h5 className="mt-4 text-sm text-black/90">{name}</h5>
        </a>
      </Link>
      <div className="mt-4 flex items-center justify-between font-bold">
        <p className="text-lg">{formatMoney(Number.parseInt(price) / 100)}</p>

        <p className="text-xs uppercase tracking-wide">{variants}</p>
      </div>
      <button
        onClick={() =>
          cartState.addItemToCart({
            id: id,
            price: 21.37,
            title: name,
            count: 1,
          })
        }
        className="inline-block rounded-md border border-transparent bg-indigo-600 mt-3 justify-center py-2 px-6 text-center font-medium text-white hover:bg-indigo-700"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};
