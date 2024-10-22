import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../pages/index";

test("Page", () => {
  render(<Page />);
  expect(screen.getByText("test")).toBeDefined();
});
