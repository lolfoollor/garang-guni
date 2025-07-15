import FormInputField from "@/components/form/FormInputField";
import {
  InputAdornment,
  TextFieldProps,
  InputProps as MuiInputProps,
} from "@mui/material";
import { FieldValues, Path } from "react-hook-form";

type InputFieldWithIconsProps<T extends FieldValues> = {
  name: Path<T>;
  showErrorText?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & TextFieldProps;

const InputFieldWithIcons = <T extends FieldValues>({
  name,
  showErrorText = true,
  startIcon,
  endIcon,
  InputProps: inputPropsFromParent,
  ...muiProps
}: InputFieldWithIconsProps<T>) => {
  const mergedInputProps: MuiInputProps = {
    startAdornment: (
      <InputAdornment position="start">{startIcon && startIcon}</InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">{endIcon && endIcon}</InputAdornment>
    ),
    ...inputPropsFromParent,
  };

  return (
    <FormInputField
      name={name}
      InputProps={mergedInputProps}
      showErrorText={showErrorText}
      {...muiProps}
    />
  );
};

export default InputFieldWithIcons;
