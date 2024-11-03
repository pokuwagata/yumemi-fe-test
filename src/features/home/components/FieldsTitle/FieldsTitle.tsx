import { ReactNode } from "react";

import styles from "./FieldsTitle.module.css";

import { Text } from "~/components/Text";

type Props = {
  children: ReactNode;
};

export function FieldsTitle({ children }: Props) {
  return (
    <div className={styles.title}>
      <Text fontSize="lg" fontWeight="medium">
        {children}
      </Text>
    </div>
  );
}
