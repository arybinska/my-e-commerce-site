import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";
import { NextSeo } from "next-seo";
import { AppMarkdown } from "./AppMarkdown";
import { MarkdownResult } from "../utils";
import { useContext } from "react";
import { useCartState } from "./Cart/CartContext";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownResult;
}
interface ProductDetailsProps {
  data: ProductDetail;
}

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://naszsklep.vercel.app/products/${data.id}`}
        openGraph={{
          url: `https://naszsklep.vercel.app/products/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: "image/jpeg",
            },
          ],
          siteName: "Nasz sklep",
        }}
      />
      <Image
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        layout="responsive"
        width={16}
        height={9}
        objectFit="contain"
      />
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <AppMarkdown>{data.longDescription}</AppMarkdown>
      </article>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<
  ProductDetail,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
  return (
    <div className="bg-white p-4">
      <Image
        src={data.thumbnailUrl}
        alt={data.thumbnailAlt}
        layout="responsive"
        width={16}
        height={9}
        objectFit="contain"
      />
      <div className="p-4">
        <Link href={`/products/${data.id}`}>
          <a href="">
            <h2 className="pb-4 text-3xl font-bold">{data.title}</h2>
          </a>
        </Link>
        <button
          onClick={() =>
            cartState.addItemToCart({
              price: 21.37,
              title: data.title,
            })
          }
          className="text-black bg-blue-100 border-spacing-2 p-2 hover:bg-red-50"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};
