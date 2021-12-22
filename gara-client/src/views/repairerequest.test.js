import { ValidateCustomerInfo, ValidateCarInfo } from './RepairedRequestList'

describe("Validate car info", () => {
    test.each([
        ["", "1238AG193JFA1319FA1094", "38183", "John"],
        ["18A-13821", "", "38183", "John"],
        ["18A-13821", "1238AG193JFA1319FA1094", "", "John"],
        ["18A-13821", "1238AG193JFA1319FA1094", "38183", ""],
    ])("Should return [false] when empty required information", async (numberPlate, VIN, registerId, owner) => {
        const result = ValidateCarInfo({ numberPlate, VIN, registerId, owner })
        expect(result).toEqual(false)
    })

    test.each([
        [true, "18A-12383", "1238AG193JFA1319FA1094", "38183", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "18aA-12383", "1238AG193JFA1319FA1094", "38183", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "18A-12A83", "1238AG193JFA1319FA1094", "38183", "John", "YAMAHA", 12, "blue", "YAMAHA"]
    ])("Should return [%p] when enter [%p] as number plate", async (expected, numberPlate, VIN, registerId, owner, brand, distanceTravelled, color, model) => {
        const result = ValidateCarInfo({ numberPlate, VIN, color, model, owner, registerId, brand, distanceTravelled })
        expect(result).toEqual(expected)
    })
})

describe("Validate user info", () => {
    test.each([
        ["", "0983828132"],
        ["john", ""],
    ])("Should return [false] when empty required information", async (name, phoneNumber) => {
        const result = ValidateCustomerInfo({ name, phoneNumber })
        expect(result).toEqual(false)
    })

    test.each([
        [true, "0983188111", "name"],
        [true, "01234567891", "name"],
        [true, "+0321312321", "name"],
        [false, "-321312321", "name"],
        [false, "-3213123A1", "name"]
    ])("Should return [%p] when enter [%s] as phone number", async (expected, phoneNumber, name) => {
        const result = ValidateCustomerInfo({ name, phoneNumber })
        expect(result).toEqual(expected)
    })
})