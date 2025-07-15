import { FormControlLabel, Checkbox } from "@mui/material";
import styles from "./CheckBoxGroup.module.css";
import { Control, Controller } from "react-hook-form";

interface CategorySection {
  label: string;
  options: string[];
}

interface CheckboxGroupProps {
  categories: CategorySection[];
  itemsPerRow?: 1 | 2;
  name: string;
  control: Control<any>;
  error?: string;
}

const CheckboxGroup = ({
  categories,
  itemsPerRow = 2,
  name,
  control,
  error,
}: CheckboxGroupProps) => {
  const handleChange = (field: any, option: string) => {
    const currentValue: string[] = field.value || [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter((val) => val !== option)
      : [...currentValue, option];
    field.onChange(newValue);
  };

  const checkBoxWidth = `${100.0 / itemsPerRow}%`;

  const renderOption = (option: string, field: any) => (
    <div
      key={option}
      style={{ width: checkBoxWidth }}
      className={styles.optionContainer}
    >
      <FormControlLabel
        label={<span className={styles.labelText}>{option}</span>}
        control={
          <Checkbox
            checked={field.value?.includes(option) || false}
            onChange={() => handleChange(field, option)}
            className={styles.checkBox}
          />
        }
      />
    </div>
  );

  const renderCategory = (category: CategorySection, field: any) => (
    <div key={category.label} className={styles.categoryContainer}>
      <div className={styles.categoryHeader}>{category.label}</div>
      <div className={styles.categoryOptionsContainer}>
        {category.options.map((option) => renderOption(option, field))}
      </div>
    </div>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className={`${styles.checkBoxContainer} ${error ? styles.error : ""}`}
        >
          {categories.map((category) => renderCategory(category, field))}
        </div>
      )}
    />
  );
};

export default CheckboxGroup;
