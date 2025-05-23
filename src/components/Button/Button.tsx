import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
};

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
