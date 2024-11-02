import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement } from "react";
import { beforeAll, afterEach, afterAll } from "vitest";

import { Home } from "~/features/home/components/Home";
import prefectures from "~/mocks/prefectures.json";
import { server } from "~/mocks/server";

beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// @see https://github.com/recharts/recharts/issues/2982#issuecomment-1545948222
vi.mock("recharts", async () => {
  const OriginalModule =
    await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: ReactElement }) => (
      <OriginalModule.ResponsiveContainer width={800} height={800}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("正常系", () => {
  test("初期表示時に北海道が選択されてグラフが表示されていること", async () => {
    const { container } = render(<Home prefectures={prefectures.result} />);

    const checkbox = await screen.findByLabelText("北海道");
    expect(checkbox).toBeChecked();

    const radio = screen.getByLabelText("総人口");
    expect(radio).toBeChecked();

    await waitFor(() => {
      const line = container.querySelector("path[name='北海道']");

      expect(line).toBeInTheDocument();
    });
  });

  test("複数の都道府県を選択しグラフが表示されていること", async () => {
    const { container } = render(<Home prefectures={prefectures.result} />);

    const checkbox = await screen.findByLabelText("青森県");

    const user = userEvent.setup();
    await user.click(checkbox);

    await waitFor(() => {
      const line1 = container.querySelector("path[name='北海道']");
      const line2 = container.querySelector("path[name='青森県']");

      expect(line1).toBeInTheDocument();
      expect(line2).toBeInTheDocument();
    });
  });

  test("人口動態の種別を切り替えると対応するグラフが表示されていること", async () => {
    const { container } = render(<Home prefectures={prefectures.result} />);

    const checkbox = await screen.findByLabelText("北海道");

    expect(checkbox).toBeChecked();

    const radio = screen.getByLabelText("年少人口");

    const user = userEvent.setup();
    await user.click(radio);
    expect(radio).toBeChecked();

    await waitFor(() => {
      const line = container.querySelector("path[name='北海道']");

      expect(line).toMatchSnapshot();
    });
  });

  test("都道府県が未選択の場合は人口動態の種別を切り替えられないこと", async () => {});
  test("都道府県が未選択の場合はグラフが非表示になっていること", async () => {});
});
