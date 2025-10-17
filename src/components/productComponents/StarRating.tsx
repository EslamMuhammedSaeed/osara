import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const StarRating: React.FC<{ rating: number; reviews: number }> = ({
  rating,
  reviews,
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={i} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">{stars}</div>
      <span className="text-sm text-gray-600 ml-1">{reviews} Reviews</span>
    </div>
  );
};
