import { ReviewContentFragment } from "../../generated/graphql";
import { WhiteStar, YellowStar } from "./Stars";

interface ProductReviewItemProps {
  review: ReviewContentFragment;
}
export const ProductReviewItem = ({ review }: ProductReviewItemProps) => {
  const isOptimistic = review.id.startsWith("-");
  return (
    <li
      className={`mb-4 shadow-md bg-gray-50 p-4 rounded-md ${
        isOptimistic ? "opacity-50" : ""
      }`}
    >
      <header className="sm:flex sm:items-center">
        <div className="-ml-1 flex">
          {review.rating === 1 && (
            <>
              <YellowStar />
              <WhiteStar />
              <WhiteStar />
              <WhiteStar />
              <WhiteStar />
            </>
          )}
          {review.rating === 2 && (
            <>
              <YellowStar />
              <YellowStar />
              <WhiteStar />
              <WhiteStar />
              <WhiteStar />
            </>
          )}
          {review.rating === 3 && (
            <>
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <WhiteStar />
              <WhiteStar />
            </>
          )}
          {review.rating === 4 && (
            <>
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <WhiteStar />
            </>
          )}
          {review.rating === 5 && (
            <>
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <YellowStar />
              <YellowStar />
            </>
          )}
        </div>
        <p className="mt-2 font-medium sm:ml-4 sm:mt-0">{review.headline}</p>
      </header>
      <p className="mt-2 text-gray-700">{review.content}</p>
      <footer className="mt-4">
        <p className="text-xs text-gray-500">{review.name}</p>
      </footer>
    </li>
  );
};
