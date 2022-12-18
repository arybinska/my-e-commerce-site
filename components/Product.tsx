import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";
import { NextSeo } from "next-seo";
import { AppMarkdown } from "./AppMarkdown";
import { MarkdownResult } from "../utils";
import { useCartState } from "./Cart/CartContext";
import { useCreateProductReviewMutation } from "../generated/graphql";

interface ProductDetail {
  id: string;
  title: string;
  description: MarkdownResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}
interface ProductDetailsProps {
  data: ProductDetail;
}

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  const [createReview, createReviewResult] = useCreateProductReviewMutation();

  const addReview = () =>
    createReview({
      variables: {
        review: {
          headline: "Klient",
          name: "Alicja",
          email: "siema@siema.com",
          content: "Super produkt!",
          rating: 5,
        },
      },
    });
  return (
    <>
      <NextSeo
        title={data.title}
        canonical={`https://naszsklep.vercel.app/products/${data.id}`}
        openGraph={{
          url: `https://naszsklep.vercel.app/products/${data.id}`,
          title: data.title,
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
      <article className="p-4 prose lg:prose-xl">
        <AppMarkdown>{data.description}</AppMarkdown>
      </article>
      <Rating rating={data.rating} />
      <button onClick={addReview} type="button">
        Dodaj komentarz
      </button>
      {createReviewResult.loading && (
        <div className="animate-bounce text-3xl">Ładowanko...</div>
      )}
      {createReviewResult.error && (
        <pre>{JSON.stringify(createReviewResult.error, null, 2)}</pre>
      )}
      {createReviewResult.data && (
        <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre>
      )}
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
      </div>
      <div className="m-auto">
        <button
          onClick={() =>
            cartState.addItemToCart({
              id: data.id,
              price: 21.37,
              title: data.title,
              count: 1,
            })
          }
          className="inline-block rounded-md border border-transparent bg-indigo-600 justify-center py-2 px-6 text-center font-medium text-white hover:bg-indigo-700"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};
