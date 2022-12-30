import { useGetReviewsForProductSlugQuery } from "../../generated/graphql";
import { ProductReviewItem } from "./ProductReviewItem";

interface ProductReviewListProps {
  productSlug: string;
}

export const ProductReviewList = ({ productSlug }: ProductReviewListProps) => {
  const { data, loading, error, client } = useGetReviewsForProductSlugQuery({
    variables: {
      slug: productSlug,
    },
  });

  if (!data?.product) {
    return null;
  }

  return (
    <ul>
      {data.product.reviews.map((review) => (
        <ProductReviewItem key={review.id} review={review} />
      ))}
    </ul>
  );
};
