import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { AppMarkdown } from "./AppMarkdown";
import { MarkdownResult } from "../utils";
import { useCartState } from "./Cart/CartContext";
import { useCreateProductReviewMutation } from "../generated/graphql";
import { WhiteStar, YellowStar } from "./Review/Stars";
import { formatMoney } from "../pages/api/formatMoney";
import { ProductReviewContainer } from "./Review/ProductReviewContainer";

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
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="ml-5 h-full w-full object-cover object-center">
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            width={500}
            height={500}
            objectFit="contain"
          />
        </div>
        <div className="h-full w-full object-cover object-center">
          <div className="lg:col-span-2 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {data.title}
            </h1>
          </div>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="sr-only">Product information</p>
            <p className="mt-4 text-3xl tracking-tight text-gray-900">
              {formatMoney(data.price / 100)}
            </p>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-8 lg:pr-8">
              <div>
                <h3 className="font-bold sm:text-lg mb-5 mt-5">Description</h3>
                <div className="space-y-6">
                  <AppMarkdown>{data.description}</AppMarkdown>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-screen-xl py-4">
            <h2 className="font-bold sm:text-lg">Customer Reviews</h2>
            <div className="mt-4  mb-4 flex items-center">
              <p className="text-3xl font-medium">
                {data.rating}
                <span className="sr-only"> Average review score </span>
              </p>
              <div className="ml-4">
                <div className="-ml-1 flex">
                  {data.rating === 1 && (
                    <>
                      <YellowStar />
                      <WhiteStar />
                      <WhiteStar />
                      <WhiteStar />
                      <WhiteStar />
                    </>
                  )}
                  {data.rating === 2 && (
                    <>
                      <YellowStar />
                      <YellowStar />
                      <WhiteStar />
                      <WhiteStar />
                      <WhiteStar />
                    </>
                  )}
                  {data.rating === 3 && (
                    <>
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                      <WhiteStar />
                      <WhiteStar />
                    </>
                  )}
                  {data.rating === 4 && (
                    <>
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                      <WhiteStar />
                    </>
                  )}
                  {data.rating === 5 && (
                    <>
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                      <YellowStar />
                    </>
                  )}
                </div>
              </div>
            </div>
            <ProductReviewContainer productSlug={data.id} />
          </div>
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
