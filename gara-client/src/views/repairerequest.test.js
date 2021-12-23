import { validateCustomerInformation, validateCarInformation } from './RepairedRequestList'

describe("Validate car info", () => {
    test.each([
        ["", "1238AG193JFA1319F", "38183", "John"],
        ["18A-13821", "", "38183", "John"],
        ["18A-13821", "1238AG193JFA1319F", "", "John"],
        ["18A-13821", "1238AG193JFA1319F", "38183", ""],
    ])("Should return [false] when empty required information", async (numberPlate, VIN, registerId, owner) => {
        const result = validateCarInformation({ numberPlate, VIN, registerId, owner })
        expect(result).toEqual(false)
    })

    test.each([
        [true, "18A-12383", "1238AG193JFA1319F", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [true, "18A-1238", "1238AG193JFA1319F", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "18A-123831", "1238AG193JFA1319F", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "18A-1238$3", "1238AG193JFA1319F", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
    ])("Should return [%p] when enter [%p] as number plate", async (expected, numberPlate, VIN, registerId, owner, brand, distanceTravelled, color, model) => {
        const result = validateCarInformation({ numberPlate, VIN, color, model, owner, registerId, brand, distanceTravelled })
        expect(result).toEqual(expected)
    })
    test.each([
        [true, "1238AG193JFA1319F", "18A-12313", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "1238AG193JFA1319", "18A-12313", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "1238AG193JFA1319FF", "18A-12313", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "1238AG193JFA1319%FF", "18A-12313", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "1238AG193JFA1-319%FF", "18A-12313", "ID13912391", "John", "YAMAHA", 12, "blue", "YAMAHA"],
    ])("Should return [%p] when enter [%p] as VIN", async (expected, VIN, numberPlate, registerId, owner, brand, distanceTravelled, color, model) => {
        const result = validateCarInformation({ numberPlate, VIN, color, model, owner, registerId, brand, distanceTravelled })
        expect(result).toEqual(expected)
    })
    test.each([
        [true, "ID123931", "18A-12383", "1238AG193JFA1319F", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "ID1-23931", "18A-12383", "1238AG193JFA1319F", "John", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "ID1239%31", "18A-12383", "1238AG193JFA1319F", "John", "YAMAHA", 12, "blue", "YAMAHA"],
    ])("Should return [%p] when enter [%p] as register ID", async (expected, registerId, numberPlate, VIN, owner, brand, distanceTravelled, color, model) => {
        const result = validateCarInformation({ numberPlate, VIN, color, model, owner, registerId, brand, distanceTravelled })
        expect(result).toEqual(expected)
    })
    test.each([
        [true, "name", "18A-12383", "1238AG193JFA1319F", "ID13912391", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "name1", "18A-12383", "1238AG193JFA1319F", "ID13912391", "YAMAHA", 12, "blue", "YAMAHA"],
        [false, "name$", "18A-12383", "1238AG193JFA1319F", "ID13912391", "YAMAHA", 12, "blue", "YAMAHA"],
    ])("Should return [%p] when enter [%p] as owner", async (expected, owner, numberPlate, VIN, registerId, brand, distanceTravelled, color, model) => {
        const result = validateCarInformation({ numberPlate, VIN, color, model, owner, registerId, brand, distanceTravelled })
        expect(result).toEqual(expected)
    })
})

describe("Validate user info", () => {
    test.each([
        ["", "0983828132"],
        [null, "0983828132"],
        ["john", ""],
        ["john", null],
    ])("Should return [false] when empty required information", async (name, phoneNumber) => {
        const result = validateCustomerInformation({ name, phoneNumber })
        expect(result).toEqual(false)
    })

    test.each([
        [true, "0983188111", "name"],
        [true, "01234567891", "name"],
        [true, "+0321312321", "name"],
        [false, "012345678", "name"],
        [false, "0123A45678", "name"],
        [false, "0123%45678", "name"],
    ])("Should return [%p] when enter [%s] as phone number", async (expected, phoneNumber, name) => {
        const result = validateCustomerInformation({ name, phoneNumber })
        expect(result).toEqual(expected)
    })

    test.each([
        [true, "name", "0954654134"],
        [false, "name1", "0954654134"],
        [false, "name$", "0954654134"],
    ])("Should return [%p] when enter [%s] as name", async (expected, name, phoneNumber) => {
        const result = validateCustomerInformation({ name, phoneNumber })
        expect(result).toEqual(expected)
    })
})