import { ValidateUsername } from './Login'

describe("Validate username", () => {
    test.each([
        [true, "username1"],
        [false, "user"],
        [false, ""],
        [false, "usernameusernamelong1"],
        [false, "user name"],
        [false, "username_"],
        [false, "_username"],
        [false, ".username"],
        [false, "username."],
        [false, "user_.name"],
        [false, "user._name"],
        [false, "user..name"],
        [false, "use$rname"],
    ])("Should return [%p] when enter [%s] as username", (expected, username) => {
        const result = ValidateUsername(username)
        expect(result).toEqual(expected)
    })
})