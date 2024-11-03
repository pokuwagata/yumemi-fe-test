import { ReactNode } from "react";

import { Text } from "~/components/Text";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header>
      <h1>
        <Text fontSize="xl" fontWeight="semi-bold">
          {children}
        </Text>
      </h1>
    </header>
  );
}
