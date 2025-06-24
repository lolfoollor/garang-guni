import { TextField, TextFieldProps } from "@mui/material";
import { useFormContext, FieldValues, Path } from "react-hook-form";

type FormInputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  showErrorText?: boolean;
} & TextFieldProps;

export default function FormInputField<T extends FieldValues>({
  name,
  showErrorText = true,
  ...muiProps
}: FormInputFieldProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <TextField
      {...register(name)}
      variant="outlined"
      error={!!error}
      helperText={showErrorText && (error?.message?.toString() || "")}
      {...muiProps}
    />
  );
}
