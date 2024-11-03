import { FallbackProps } from "react-error-boundary";

export function Fallback({ error }: FallbackProps) {
  return (
    <div>
      <p>エラーが発生しました</p>
      <p>{error.message}</p>
    </div>
  );
}
