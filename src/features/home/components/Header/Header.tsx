import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Header({ children }: Props) {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}
