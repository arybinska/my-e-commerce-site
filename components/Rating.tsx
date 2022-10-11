interface RatingProps {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  return <div className="font-bold text-blue-500">{rating}</div>;
};
