import Image from "next/image";
import Link from "next/link";
import { Rating } from "./Rating";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
}
interface ProductDetailsProps {
  data: ProductDetail;
}

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <>
      <Image src={data.thumbnailUrl} alt={data.thumbnailAlt} layout="responsive" width={16} height={9} objectFit="contain"/>
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      <p className="p-4">{data.description}</p>
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
  return (
    <div className="bg-white p-4">
      <Image src={data.thumbnailUrl} alt={data.thumbnailAlt} layout="responsive" width={16} height={9} objectFit="contain"/>
      <Link href={`/products/${data.id}`}>
      <a href="">
        <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
      </a>
      </Link>
    </div>
  );
};
