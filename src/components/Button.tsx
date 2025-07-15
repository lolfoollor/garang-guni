import { ButtonHTMLAttributes, CSSProperties } from "react";
import styles from "./Button.module.css";
import Loading from "./Loading";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonStyle?: CSSProperties;
  textStyle?: CSSProperties;
  onClick?: () => void;
  loading?: boolean;
  label?: string;
  className?: string;
}

function Button({
  buttonStyle = {},
  textStyle = {},
  onClick = () => {},
  loading = false,
  label = "Click me",
  className,
  ...buttonProps
}: ButtonProps) {
  // Note: The button's default styles cannot be overridden using the `className`
  // prop due to how tailwind works with module.css. If you want to override
  // specific parts, consider using `buttonStyle` and `textStyle` props
  // or alternatively use in-line classname.

  if (loading) {
    return <Loading />;
  }

  return (
    <button
      style={buttonStyle}
      className={`${className ? className : styles.button}`}
      onClick={onClick}
      {...buttonProps}
    >
      <span style={textStyle}>{label}</span>
    </button>
  );
}

export default Button;
