import { Alert } from "@mui/material";

interface FormErrorCardProps {
  message: string;
}

const FormErrorCard = ({ message }: FormErrorCardProps) => {
  return (
    <Alert severity="error" sx={{ width: "100%" }} className="text-left">
      {message}
    </Alert>
  );
};

export default FormErrorCard;
