"use client";

import Image from "next/image";
import styles from "./ImageLink.module.css";

type ImageLinkProps = {
  href: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImageLink({
  href,
  src,
  alt,
  width = 500,
  height = 500,
  className = "",
}: ImageLinkProps) {
  return (
    <a href={href}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    </a>
  );
}
