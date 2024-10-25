import "@testing-library/jest-dom/vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { test, beforeAll, afterEach, afterAll, expect } from "vitest";

import { server } from "~/mocks/server";
import Page from "~/pages/index";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Page", async () => {
  render(<Page />);

  await waitForElementToBeRemoved(() => screen.queryByText("isLoading"));

  expect(screen.getByText("data:")).toBeInTheDocument();
});
