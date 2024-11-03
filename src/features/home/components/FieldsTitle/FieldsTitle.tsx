import { Text } from "~/components/Text";
import styles from "./FieldsTitle.module.css";
import { ReactNode } from "react";

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
