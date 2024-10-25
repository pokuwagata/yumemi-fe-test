import "destyle.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  const mockingEnabled = !!process.env.NEXT_PUBLIC_API_MOCKING;
  const [shouldRender, setShouldRender] = useState(!mockingEnabled);

  // @see https://github.com/mswjs/msw/discussions/1049#discussioncomment-6155762
  useEffect(() => {
    if (typeof window !== "undefined" && mockingEnabled) {
      import("../mocks/browser").then(async ({ worker }) => {
        await worker.start();
        setShouldRender(true);
      });
    }
  }, [mockingEnabled]);

  return (
    shouldRender && (
      <SWRConfig value={{ revalidateOnFocus: false }}>
        <Component {...pageProps} />
      </SWRConfig>
    )
  );
}
