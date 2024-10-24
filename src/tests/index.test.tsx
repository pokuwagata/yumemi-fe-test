import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import Page from "~/pages/index";

test("Page", () => {
  render(<Page />);
  expect(screen.getByText("isLoading")).toBeDefined();
});
