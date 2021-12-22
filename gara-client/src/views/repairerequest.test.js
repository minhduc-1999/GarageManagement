import { ValidateCustomer } from './RepairedRequestList'

test("test", () => {
    const customer = {
        name: ""
    }
    expect(ValidateCustomer(customer)).toEqual(false)
})