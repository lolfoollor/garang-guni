import { CSSProperties } from "react";
import styles from "./Button.module.css";
import Loading from "./Loading";

interface ButtonProps {
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
    >
      <p style={textStyle}>{label}</p>
    </button>
  );
}

export default Button;
