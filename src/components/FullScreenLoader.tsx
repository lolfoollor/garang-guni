import { Backdrop, CircularProgress } from "@mui/material";

interface FullScreenLoaderProps {
  isOpen: boolean;
  variant?: "indeterminate" | "determinate" | undefined;
  color?:
    | "success"
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "warning";
  size?: number | string;
}

const DEFAULT_LOADER_SIZE = 96;

const FullScreenLoader = ({
  isOpen,
  variant = "indeterminate",
  color = "success",
  size = DEFAULT_LOADER_SIZE,
}: FullScreenLoaderProps) => {
  return (
    <>
      {isOpen && (
        <Backdrop
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isOpen}
        >
          <CircularProgress variant={variant} color={color} size={size} />
        </Backdrop>
      )}
    </>
  );
};

export default FullScreenLoader;
