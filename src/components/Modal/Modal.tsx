"use client";

import React from "react";
import styles from "./Modal.module.css";
import { Josefin_Sans } from "next/font/google";

const josefin_sans = Josefin_Sans({ subsets: ["latin"], weight: "400" });

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  borderColor?: string;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  backgroundColor = "#780000",
  borderColor = "#bc2222",
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.popup} ${josefin_sans.className}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor,
          borderColor,
          borderStyle: "solid",
          borderWidth: "1px",
        }}
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
        >
          &times;
        </button>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
