import { FallbackProps } from "react-error-boundary";
import { Text } from "~/components/Text";

export function Fallback({ error }: FallbackProps) {
  return (
    <div>
      <p>
        <Text fontSize="md" fontWeight="semi-bold">
          エラーが発生しました
        </Text>
      </p>
      <p>
        <Text fontSize="md" fontWeight="normal">
          {error.message}
        </Text>
      </p>
    </div>
  );
}
