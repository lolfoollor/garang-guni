import { MoonLoader } from "react-spinners";

interface LoadingProps {
  size?: number;
  color?: string | undefined;
  speedModifier?: number;
}

const Loading = ({
  size = 24,
  color = "green",
  speedModifier = 0.5,
}: LoadingProps) => {
  return (
    <MoonLoader size={size} color={color} speedMultiplier={speedModifier} />
  );
};

export default Loading;
