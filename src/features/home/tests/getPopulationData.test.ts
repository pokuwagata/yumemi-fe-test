import { getPopulationData } from "~/features/home/lib/getPopulationData";
import population1ResponseData from "~/mocks/population-1.json";
import population2ResponseData from "~/mocks/population-2.json";

describe("API レスポンスを Recharts で利用可能な形式に変換できること", () => {
  describe("選択中の都道府県が 1 つの場合", () => {
    test("種別が 0 の場合", () => {
      const rawPopulationResponses = { 1: population1ResponseData.result.data };
      const data = getPopulationData(rawPopulationResponses, [1], 0);

      expect(data).toStrictEqual([
        { "1": 5039206, name: 1960 },
        { "1": 5171800, name: 1965 },
        { "1": 5184287, name: 1970 },
        { "1": 5338206, name: 1975 },
        { "1": 5575989, name: 1980 },
        { "1": 5679439, name: 1985 },
        { "1": 5643647, name: 1990 },
        { "1": 5692321, name: 1995 },
        { "1": 5683062, name: 2000 },
        { "1": 5627737, name: 2005 },
        { "1": 5506419, name: 2010 },
        { "1": 5381733, name: 2015 },
        { "1": 5224614, name: 2020 },
        { "1": 5016554, name: 2025 },
        { "1": 4791592, name: 2030 },
        { "1": 4546357, name: 2035 },
        { "1": 4280427, name: 2040 },
        { "1": 4004973, name: 2045 },
      ]);
    });

    test("種別が 1 の場合", () => {
      const rawPopulationResponses = { 1: population1ResponseData.result.data };
      const data = getPopulationData(rawPopulationResponses, [1], 1);

      expect(data).toStrictEqual([
        { "1": 1681479, name: 1960 },
        { "1": 1462123, name: 1965 },
        { "1": 1309487, name: 1970 },
        { "1": 1312611, name: 1975 },
        { "1": 1298324, name: 1980 },
        { "1": 1217959, name: 1985 },
        { "1": 1034251, name: 1990 },
        { "1": 898673, name: 1995 },
        { "1": 792352, name: 2000 },
        { "1": 719057, name: 2005 },
        { "1": 657312, name: 2010 },
        { "1": 608296, name: 2015 },
        { "1": 555804, name: 2020 },
        { "1": 511677, name: 2025 },
        { "1": 465307, name: 2030 },
        { "1": 423382, name: 2035 },
        { "1": 391086, name: 2040 },
        { "1": 360177, name: 2045 },
      ]);
    });
  });

  describe("選択中の都道府県が 2 つの場合", () => {
    test("種別が 0 の場合", () => {
      const rawPopulationResponses = {
        1: population1ResponseData.result.data,
        2: population2ResponseData.result.data,
      };
      const data = getPopulationData(rawPopulationResponses, [1, 2], 0);

      expect(data).toStrictEqual([
        { "1": 5039206, "2": 1426606, name: 1960 },
        { "1": 5171800, "2": 1416591, name: 1965 },
        { "1": 5184287, "2": 1427520, name: 1970 },
        { "1": 5338206, "2": 1468646, name: 1975 },
        { "1": 5575989, "2": 1523907, name: 1980 },
        { "1": 5679439, "2": 1524448, name: 1985 },
        { "1": 5643647, "2": 1482873, name: 1990 },
        { "1": 5692321, "2": 1481663, name: 1995 },
        { "1": 5683062, "2": 1475728, name: 2000 },
        { "1": 5627737, "2": 1436657, name: 2005 },
        { "1": 5506419, "2": 1373339, name: 2010 },
        { "1": 5381733, "2": 1308265, name: 2015 },
        { "1": 5224614, "2": 1237984, name: 2020 },
        { "1": 5016554, "2": 1157332, name: 2025 },
        { "1": 4791592, "2": 1076393, name: 2030 },
        { "1": 4546357, "2": 993737, name: 2035 },
        { "1": 4280427, "2": 908974, name: 2040 },
        { "1": 4004973, "2": 823610, name: 2045 },
      ]);
    });

    test("種別が 1 の場合", () => {
      const rawPopulationResponses = {
        1: population1ResponseData.result.data,
        2: population2ResponseData.result.data,
      };
      const data = getPopulationData(rawPopulationResponses, [1, 2], 1);

      expect(data).toStrictEqual([
        { "1": 1681479, "2": 513397, name: 1960 },
        { "1": 1462123, "2": 447068, name: 1965 },
        { "1": 1309487, "2": 396883, name: 1970 },
        { "1": 1312611, "2": 380218, name: 1975 },
        { "1": 1298324, "2": 366454, name: 1980 },
        { "1": 1217959, "2": 338554, name: 1985 },
        { "1": 1034251, "2": 289082, name: 1990 },
        { "1": 898673, "2": 252414, name: 1995 },
        { "1": 792352, "2": 223141, name: 2000 },
        { "1": 719057, "2": 198959, name: 2005 },
        { "1": 657312, "2": 171842, name: 2010 },
        { "1": 608296, "2": 148208, name: 2015 },
        { "1": 555804, "2": 129112, name: 2020 },
        { "1": 511677, "2": 114024, name: 2025 },
        { "1": 465307, "2": 100253, name: 2030 },
        { "1": 423382, "2": 87648, name: 2035 },
        { "1": 391086, "2": 77258, name: 2040 },
        { "1": 360177, "2": 67472, name: 2045 },
      ]);
    });
  });
});
