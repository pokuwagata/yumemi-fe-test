import "@testing-library/jest-dom/vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";

import { server } from "~/mocks/server";
import Page from "~/pages/sandbox/api";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Page", async () => {
  render(<Page />);

  await waitForElementToBeRemoved(() => screen.queryByText("isLoading"));

  expect(screen.getByText("data:")).toBeInTheDocument();
});
