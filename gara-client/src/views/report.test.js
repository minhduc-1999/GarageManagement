import { validateYear } from "./Report";

test.each([
["2021",true],
["2019",true],
["2022",true],
["1900",true],
["1960",true],
["2099",true],
["2100",false],
["1899",false],
["0",false],
["0000",false],
["abcd",false],
["-1999",false],
["-1",false],
["",false],
["19ab$@",false]])
(
  "Should return [expected] when validateYear for [year] ",
  (year, expected) => {
    expect(validateYear(year)).toEqual(expected);
  }
);
