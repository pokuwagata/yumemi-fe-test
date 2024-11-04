import "@testing-library/jest-dom/vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { ReactElement } from "react";
import { beforeAll, afterEach, afterAll } from "vitest";

import { Home } from "~/features/home/components/Home";
import { populationCache } from "~/features/home/lib/populationCache";
import { PROXY_API_PATH } from "~/lib/const";
import { getErrorDetail } from "~/mocks/handlers";
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

afterEach(() => {
  server.resetHandlers();
  populationCache.clear();
});
afterAll(() => server.close());

// @see https://github.com/recharts/recharts/issues/2982#issuecomment-1545948222
vi.mock("recharts", async () => {
  const OriginalModule =
    await vi.importActual<typeof import("recharts")>("recharts");

  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: ReactElement }) => (
      <OriginalModule.ResponsiveContainer width={800} aspect={1}>
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

  test("都道府県が未選択の場合は人口動態の種別を切り替えられないこと", async () => {
    render(<Home prefectures={prefectures.result} />);

    const checkbox = await screen.findByLabelText("北海道");

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();

    const radios = screen.getByTestId("population-types");
    expect(radios).toBeDisabled();
  });

  test("都道府県が未選択の場合はグラフが非表示になっていること", async () => {
    render(<Home prefectures={prefectures.result} />);

    const checkbox = await screen.findByLabelText("北海道");

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(checkbox).not.toBeChecked();

    const caution = await screen.findByTestId("caution-text");
    expect(caution).toBeInTheDocument();
  });
});

describe("異常系", () => {
  describe("API エラーレスポンスに対して適切なエラーメッセージを表示すること", () => {
    function mockAPIError(errorCode: string) {
      server.use(
        http.get(`${PROXY_API_PATH}/population`, () => {
          const { statusCode, body } = getErrorDetail(errorCode);

          return HttpResponse.json(body, {
            status: statusCode,
          });
        }),
      );
    }

    beforeAll(() => {
      // eslint-disable-next-line no-console
      console.error = vi.fn();
    });
    test("API エラーレスポンスが 400 の場合", async () => {
      mockAPIError("400");

      render(<Home prefectures={prefectures.result} />);

      await waitForElementToBeRemoved(() => screen.queryByText("Loading"));

      const message = await screen.findByText("400 Bad Request");

      expect(message).toBeInTheDocument();
    });
    test("API エラーレスポンスが 403 の場合", async () => {
      mockAPIError("403");

      render(<Home prefectures={prefectures.result} />);

      const message = await screen.findByText("403 Forbidden");

      expect(message).toBeInTheDocument();
    });
    test("API エラーレスポンスが 404 かつレスポンスボディが object の場合", async () => {
      mockAPIError("404-1");

      render(<Home prefectures={prefectures.result} />);

      const message = await screen.findByText("404 NotFound");

      expect(message).toBeInTheDocument();
    });
    test("API エラーレスポンスが 404 かつレスポンスボディが string の場合", async () => {
      mockAPIError("404-2");

      render(<Home prefectures={prefectures.result} />);

      const message = await screen.findByText("404 NotFound");

      expect(message).toBeInTheDocument();
    });
    test("API エラーレスポンスが 429 の場合", async () => {
      mockAPIError("429");

      render(<Home prefectures={prefectures.result} />);

      const message = await screen.findByText("429 Too Many Requests");

      expect(message).toBeInTheDocument();
    });
    test("API エラーレスポンスが 500 の場合", async () => {
      mockAPIError("500");

      render(<Home prefectures={prefectures.result} />);

      const message = await screen.findByText("500 Server Error");

      expect(message).toBeInTheDocument();
    });
  });
});
