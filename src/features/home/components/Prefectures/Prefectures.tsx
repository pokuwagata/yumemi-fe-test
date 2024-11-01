import { Checkbox } from "~/features/home/components/Checkbox";
import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Prefectures({ prefectures }: Props) {
  return (
    <>
      <h2>都道府県</h2>
      <fieldset>
        {prefectures.map((prefecture, i) => {
          return <Checkbox prefecture={prefecture} key={i} />;
        })}
      </fieldset>
    </>
  );
}
