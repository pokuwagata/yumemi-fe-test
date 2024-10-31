import { Prefecture } from "~/types/api";

type Props = {
  prefectures: Prefecture[];
};

export function Prefectures({ prefectures }: Props) {
  return (
    <>
      <h2>都道府県</h2>
      <fieldset>
        {prefectures.map((prefecture) => {
          return (
            <label key={prefecture.prefCode}>
              <input type="checkbox" />
              {prefecture.prefName}
            </label>
          );
        })}
      </fieldset>
    </>
  );
}
