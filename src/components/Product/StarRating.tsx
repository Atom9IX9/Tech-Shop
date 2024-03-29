import style from "style/productStyle/starRating.module.css";
import { IoStar } from "react-icons/io5";
import { useState } from "react";

const StarRating: React.FC<TStarRatingProps> = ({
  averageRating,
  userRating = 0,
  rateHandler
}) => {
  const stars: JSX.Element[] = [];
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const getColor = (i: number) => {
    if (hoverIndex !== null) {
      if (hoverIndex >= i) {
        return "var(--violet-bg-color)";
      } else {
        return "BCBCBC";
      }
    } else {
      if (userRating || averageRating) {
        if (i < userRating) {
          return "var(--violet-bg-color)";
        } else {
          if (i < Math.round(averageRating)) {
            return "gold";
          } else {
            return "BCBCBC";
          }
        }
      }
    }
    return "BCBCBC";
  };

  for (let i = 0; i < 5; i++) {
    stars.push(
      <IoStar
        cursor="pointer"
        color={getColor(i)}
        size={30}
        onMouseEnter={(e) => setHoverIndex(i)}
        onMouseLeave={(e) => setHoverIndex(null)}
        onClick={() => rateHandler(i + 1)}
      />
    );
  }

  return (
    <div className={style.starRatingContainer}>
      <div className={style.starsContainer}>{stars}</div>
      <div className={style.avRating}>{averageRating}</div>
    </div>
  );
};

export default StarRating;
type TStarRatingProps = {
  averageRating: number; // 0-5
  userRating: number; // 0-5 ~def(0)
  rateHandler: (rate: number) => void
};
