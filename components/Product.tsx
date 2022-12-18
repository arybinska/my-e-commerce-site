import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { AppMarkdown } from "./AppMarkdown";
import { MarkdownResult } from "../utils";
import { useCartState } from "./Cart/CartContext";
import { useCreateProductReviewMutation } from "../generated/graphql";
import { Review } from "./Review/Reviews";
import { AddReview } from "./Review/AddReview";

interface ProductDetail {
  id: string;
  title: string;
  description: MarkdownResult;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  price: number;
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
      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="h-full w-full object-cover object-center">
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            width={300}
            height={300}
            objectFit="contain"
          />
        </div>
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {data.title}
          </h1>
          <div>
            <div className="mt-10 text-xl font-bold sm:text-2xl">
              <h2>Product information</h2>
            </div>
            <p className="text-3xl tracking-tight text-gray-900">
              {data.price}
            </p>
            <article className=" prose lg:prose-xl">
              <AppMarkdown>{data.description}</AppMarkdown>
            </article>
          </div>
          {/* Reviews */}
          <div className="mt-6">
            <Review rating={data.rating} />
            <div className="flex items-center">
              <div className="flex items-center">
                <button onClick={addReview} type="button">
                  Dodaj komentarz
                </button>
              </div>
            </div>
            <AddReview />
          </div>
          {createReviewResult.loading && (
            <div className="animate-bounce text-3xl">Ładowanko...</div>
          )}
          {createReviewResult.error && (
            <pre>{JSON.stringify(createReviewResult.error, null, 2)}</pre>
          )}
          {createReviewResult.data && (
            <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre>
          )}
        </div>
      </div>
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
