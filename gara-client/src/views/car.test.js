import { validateCar } from "./Car";

describe("Validate car module", () => {
  test.each([
    [true, "color", "owner", "0"],
    [false, "", "owner", "0"],
    [false, ".color_/", "owner", "0"],
    [false, "color", "", "0"],
    [false, "color", ".owner_/", "0"],
    [false, "color", "owner", ""],
    [true, "color", "owner", "0.1"],
    [false, "color", "owner", "0.0000"],
    [false, "color", "owner", "09.1"],
    [false, "color", "owner", "09."],
    [true, "color", "owner", "10000"],
  ])(
    "Should return [%p] when entering value [color, owner, distance] as [%s, %s, %s]",
    async (expected, color, owner, distance) => {
      expect(validateCar(color, owner, distance)).toEqual(expected);
    }
  );
});
