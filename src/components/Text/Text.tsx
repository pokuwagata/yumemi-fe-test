import { ReactNode } from "react";

import styles from "./Text.module.css";

type Props = {
  fontSize: "sm" | "md" | "lg" | "xl";
  fontWeight: "normal" | "medium" | "semi-bold" | "bold";
  children: ReactNode;
};

export function Text({ fontSize, fontWeight, children }: Props) {
  const classes = [styles[fontSize], styles[fontWeight]].join(" ");
  return <span className={classes}>{children}</span>;
}
