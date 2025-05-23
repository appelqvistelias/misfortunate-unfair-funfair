"use client";

import React from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  style,
  disabled = false,
}) => {
  const defaultStyle: React.CSSProperties = {
    backgroundColor: disabled ? "#a0aec0" : "#6b46c1",
    color: "white",
    padding: "12px 24px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 0.2s ease",
    ...style,
  };

  return (
    <button onClick={onClick} disabled={disabled} style={defaultStyle}>
      {text}
    </button>
  );
};

export default Button;
