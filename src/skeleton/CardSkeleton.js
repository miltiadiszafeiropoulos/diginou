import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CardButton,
  DivInfo,
  Titlos,
  Description,
  Price,
  DivImg,
} from "../components/styles/Card.styled";

export function CardSkeleton() {
  return (
    <CardButton style={{ cursor: "default" }}>
      <DivInfo>
        <Titlos>
          <Skeleton width={100} height={18} />
        </Titlos>
        <Description>
          <Skeleton count={2} width={200} />
        </Description>
        <Price>
          <Skeleton width={30} height={18} />
        </Price>
      </DivInfo>
      <DivImg style={{display:"flex",justifyContent:"right"}}>
        <Skeleton height={120} width={150} />
      </DivImg>
    </CardButton>
  );
}
