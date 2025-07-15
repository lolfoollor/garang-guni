import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import styles from "./Toggle.module.css";
import { Controller } from "react-hook-form";
import { capitalizeFirstLetter } from "../utils/textUtils";

interface ToggleProps {
  label?: string;
  options: string[];
  control: any;
  name: string;
  error?: string;
}

const Toggle = ({ label, options, control, name, error }: ToggleProps) => {
  return (
    <>
      {label && <p>{label}</p>}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <ToggleButtonGroup
            value={field.value}
            exclusive
            onChange={(_, value) => {
              if (value !== null) field.onChange(value);
            }}
            className={`${styles.toggleGroup} ${error ? styles.error : ""}`}
          >
            {options.map((option) => (
              <ToggleButton
                key={option}
                value={option}
                className={`${styles.toggleButton} ${
                  field.value === option ? styles.selected : ""
                }`}
                sx={{
                  textTransform: "none",
                  border: "none",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {capitalizeFirstLetter(option)}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      />
    </>
  );
};

export default Toggle;
