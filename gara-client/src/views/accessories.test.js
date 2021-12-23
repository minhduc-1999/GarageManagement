import { validateAccessories, validateProvider } from "./Accessories";
describe("validate Accessory info", () => {
    test.each([
        ["", "10", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"],
        ["Kính chiếu hậu", "", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"], 
        ["Kính chiếu hậu", "10", "", "2000000","21/12/2021", "abcxyz", "abcxyz"], 
        ["Kính chiếu hậu", "10", "cặp", "","21/12/2021", "abcxyz", "abcxyz"], 
        ["Kính chiếu hậu", "10", "cặp", "2000000","", "abcxyz", "abcxyz"], 
        ["Kính chiếu hậu", "10", "cặp", "2000000","21/12/2021", "", "abcxyz"], 
        ["Kính chiếu hậu", "10", "cặp", "2000000","21/12/2021", "abcxyz", ""]
    ])("Should return [false] when empty required information", async (name, quantity, unit, receiptPrice, expiredTime, accessoryproviderId, accessoryTypeId) => {
        const result = validateAccessories({ name, quantity, unit, receiptPrice, expiredTime, accessoryproviderId, accessoryTypeId })
        expect(result).toEqual(false)
    })

    test.each([
        [true,"Kính chiếu hậu", "10", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"],
        [true,"Kinh chieu hau", "5", "cap", "2000000","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "10", "cặp", "-2000000","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "10", "cặp", "2000000a","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "10", "cặp", "200000@","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "-10a", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "-10@", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"],
        [false,"Kính chiếu hậu", "-10", "cặp", "2000000","21/12/2021", "abcxyz", "abcxyz"],
    ])("Should return [%p] when validated Accessories", async (expected, name, quantity, unit, receiptPrice, expiredTime, accessoryproviderId, accessoryTypeId) => {
        const result = validateAccessories({ name, quantity, unit, receiptPrice, expiredTime, accessoryproviderId, accessoryTypeId })
        expect(result).toEqual(expected)
    })
})

describe("Validate provider info", () => {
    test.each([
        ["", "0123456789","Japan"],
        ["Toyota", "","Japan"],
        ["Toyota", "0123456789",""],

    ])("Should return [false] when empty required information", async (providerName, providerNum, address) => {
        const result = validateProvider({ providerName, providerNum, address })
        expect(result).toEqual(false)
    })

    test.each([
        [true, "Toyota","0983188111","address"],
        [true, "Toyota","01234567891", "address"],
        [true, "name","+0321312321", "address"],
        [false,"name", "-321312321", "address"],
        [false, "name","-3213123A1", "address"]
    ])("Should return [%p] when enter [%s] as phone number", async (expected, providerName, providerNum, address) => {
        const result = validateProvider({ providerName, providerNum, address })
        expect(result).toEqual(expected)
    })
})